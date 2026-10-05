# Generates the QR code SVGs used by the print pages in this folder.
# Usage:  python print\make-qr.py   (needs: pip install qrcode)
import pathlib
import qrcode
import qrcode.image.svg

HERE = pathlib.Path(__file__).parent

CODES = {
    "qr-clinic": "https://santafehunt.com/clinic",
    "qr-waiver": "https://waiver.smartwaiver.com/w/uynxuhks8mmj6bgbecunhn/web/",
}

for name, url in CODES.items():
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=0)
    qr.add_data(url)
    img = qr.make_image(image_factory=qrcode.image.svg.SvgPathImage)
    out = HERE / f"{name}.svg"
    img.save(out)
    print(out.name, "->", url)
