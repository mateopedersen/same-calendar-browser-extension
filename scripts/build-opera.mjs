import { cp, mkdir, readFile, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "dist", "opera");
const manifest = JSON.parse(await readFile(path.join(root, "manifest.json"), "utf8"));
if (manifest.manifest_version !== 3) throw new Error("Opera release must use Manifest V3.");
if (manifest.name.length > 45) throw new Error("Manifest name exceeds Opera's 45-character limit.");
if (manifest.description.length > 132) throw new Error("Manifest description exceeds 132 characters.");
if (JSON.stringify(manifest.permissions) !== JSON.stringify(["storage"])) throw new Error("Review the exact permission set before packaging.");
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const name of ["manifest.json", "popup.html", "popup.css", "popup.js", "planner.html", "planner.css", "planner.js", "lib", "icons"]) {
  await cp(path.join(root, name), path.join(out, name), { recursive: true });
}
const html = ["popup.html", "planner.html"];
for (const file of html) {
  const content = await readFile(path.join(out, file), "utf8");
  for (const [, src] of content.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)/gi)) {
    if (/^https?:/i.test(src)) throw new Error(`Remote executable script in ${file}: ${src}`);
    if (!(await stat(path.join(out, src)).catch(() => null))) throw new Error(`Missing script ${src} referenced by ${file}`);
  }
}
for (const asset of Object.values(manifest.icons)) if (!(await stat(path.join(out, asset)).catch(() => null))) throw new Error(`Missing icon: ${asset}`);
for (const file of ["lib/calendar.js", "lib/store.js", "lib/exports.js", "lib/resources.js", "popup.js", "planner.js"]) {
  const source = await readFile(path.join(out, file), "utf8");
  if (/\beval\s*\(/.test(source) || /new\s+Function\s*\(/.test(source)) throw new Error(`Dynamic code execution found in ${file}`);
}
console.log(`Opera build ready: ${out}`);
