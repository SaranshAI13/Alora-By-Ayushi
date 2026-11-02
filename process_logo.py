import shutil
import os

src = r"C:\Users\DELL\.gemini\antigravity\brain\1ed23165-4625-4945-ae6e-3111a18e44a4\.user_uploaded\media_1793625145517_8a7870f5.png"
dest_dir = r"D:\Alora-By-Ayushi\public"
os.makedirs(dest_dir, exist_ok=True)
dest_path = os.path.join(dest_dir, "alora-logo-sign.png")
shutil.copy2(src, dest_path)
print("Copied successfully to:", dest_path)

# Try cropping circular logo if PIL is available
try:
    from PIL import Image, ImageOps, ImageDraw
    img = Image.open(src)
    w, h = img.size
    print("Image size:", w, h)
    
    # Crop to the circular sign board
    # The sign board is roughly in center: box from ~ (0.05*w, 0.12*h) to (0.9*w, 0.88*h)
    # Let's crop the circular signboard
    box = (int(0.06 * w), int(0.12 * h), int(0.89 * w), int(0.87 * h))
    cropped = img.crop(box)
    cropped.save(os.path.join(dest_dir, "alora-logo-cropped.png"))
    print("Cropped logo saved!")
except Exception as e:
    print("PIL processing error:", e)
