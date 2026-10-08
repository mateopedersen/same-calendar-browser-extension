from pathlib import Path
import json
from zipfile import ZIP_DEFLATED, ZipFile

root = Path(__file__).resolve().parents[1]
source = root / "dist" / "opera"
manifest_path = source / "manifest.json"
if not manifest_path.is_file():
    raise SystemExit("Build dist/opera first; manifest.json is missing.")
version = json.loads(manifest_path.read_text(encoding="utf-8"))["version"]
target = root / "dist" / f"same-calendar-opera-{version}.zip"
with ZipFile(target, "w", ZIP_DEFLATED, compresslevel=9) as archive:
    for path in sorted(source.rglob("*")):
        if path.is_file():
            archive.write(path, path.relative_to(source).as_posix())
print(f"Created {target}")
