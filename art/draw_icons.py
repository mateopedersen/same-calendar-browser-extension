"""Draw the original Same Calendar icon source into the packaged PNG sizes."""
from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
scale = 4
size = 128 * scale
image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(image)
def box(coords):
    return tuple(round(x * scale) for x in coords)
# Deep navy rounded tile, bright calendar card, and a restrained teal date marker.
draw.rounded_rectangle(box((4, 4, 124, 124)), radius=29 * scale, fill=(21, 43, 61, 255))
draw.rounded_rectangle(box((23, 24, 105, 105)), radius=13 * scale, fill=(250, 250, 247, 255))
draw.rounded_rectangle(box((23, 24, 105, 49)), radius=13 * scale, fill=(8, 127, 120, 255))
draw.rectangle(box((23, 37, 105, 49)), fill=(8, 127, 120, 255))
# Binding rings.
for x in (43, 84):
    draw.rounded_rectangle(box((x-3, 17, x+3, 36)), radius=3 * scale, fill=(250, 250, 247, 255))
# Calendar date grid, with one selected date.
for row, y in enumerate((62, 77, 92)):
    for col, x in enumerate((42, 64, 86)):
        if row == 1 and col == 1:
            draw.rounded_rectangle(box((x-8, y-8, x+8, y+8)), radius=5 * scale, fill=(8, 127, 120, 255))
        else:
            draw.ellipse(box((x-3.5, y-3.5, x+3.5, y+3.5)), fill=(133, 151, 158, 255))
for dim in (128, 64, 48, 16):
    image.resize((dim*scale, dim*scale), Image.Resampling.LANCZOS).resize((dim, dim), Image.Resampling.LANCZOS).save(root / "icons" / f"icon{dim}.png", optimize=True)
