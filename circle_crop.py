import os
from PIL import Image, ImageDraw

dest_dir = r"D:\Alora-By-Ayushi\public"
cropped_path = os.path.join(dest_dir, "alora-logo-cropped.png")

if os.path.exists(cropped_path):
    img = Image.open(cropped_path).convert("RGBA")
    w, h = img.size
    
    # Square size
    dim = min(w, h)
    
    # Center crop
    left = (w - dim) // 2
    top = (h - dim) // 2
    img_square = img.crop((left, top, left + dim, top + dim))
    
    # Create circular mask with anti-aliasing
    mask = Image.new("L", (dim * 2, dim * 2), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, dim * 2, dim * 2), fill=255)
    mask = mask.resize((dim, dim), Image.LANCZOS)
    
    # Apply circular mask
    img_circle = Image.new("RGBA", (dim, dim), (0, 0, 0, 0))
    img_circle.paste(img_square, (0, 0), mask=mask)
    
    final_path = os.path.join(dest_dir, "alora-logo-circle.png")
    img_circle.save(final_path, "PNG")
    print("Circular logo badge created successfully:", final_path)
