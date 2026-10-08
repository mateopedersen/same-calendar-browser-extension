from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

root = Path(__file__).resolve().parents[1]
source = root / "dist" / "opera"
target = root / "dist" / "same-calendar-opera-1.0.0.zip"
if not (source / "manifest.json").is_file():
    raise SystemExit("Build dist/opera first; manifest.json is missing.")
with ZipFile(target, "w", ZIP_DEFLATED, compresslevel=9) as archive:
    for path in sorted(source.rglob("*")):
        if path.is_file():
            archive.write(path, path.relative_to(source).as_posix())
print(f"Created {target}")
