import shutil
import os
from PIL import Image, ImageDraw

src = r"C:\Users\DELL\.gemini\antigravity\brain\1ed23165-4625-4945-ae6e-3111a18e44a4\.user_uploaded\media_1793626526779_40875775.png"
dest_dir = r"D:\Alora-By-Ayushi\public"
os.makedirs(dest_dir, exist_ok=True)

# Copy raw high-res digital image
shutil.copy2(src, os.path.join(dest_dir, "alora-logo-raw.png"))

# Now create perfect transparent circular cutout of the badge
img = Image.open(src).convert("RGBA")
w, h = img.size
print("Original image size:", w, h)

# The white circular signboard is located in the center
# Center point
cx, cy = w / 2, h / 2
# The outer white/gold circle diameter is roughly from x=115 to x=910 (width ~ 795)
# Let's find radius: around 395-400 px
radius = int(w * 0.395)
bbox = (int(cx - radius), int(cy - radius), int(cx + radius), int(cy + radius))

cropped = img.crop(bbox)
dim = cropped.size[0]

# High quality anti-aliased mask
scale = 4
mask = Image.new("L", (dim * scale, dim * scale), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((0, 0, dim * scale, dim * scale), fill=255)
mask = mask.resize((dim, dim), Image.LANCZOS)

# Create transparent PNG
transparent_logo = Image.new("RGBA", (dim, dim), (0, 0, 0, 0))
transparent_logo.paste(cropped, (0, 0), mask=mask)

out_circle = os.path.join(dest_dir, "alora-logo-circle.png")
transparent_logo.save(out_circle, "PNG")

# Also save as logo.png
transparent_logo.save(os.path.join(dest_dir, "logo.png"), "PNG")

print("Saved clean circular logo to:", out_circle)
