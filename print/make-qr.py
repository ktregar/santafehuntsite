# Generates the QR code SVGs used by the print pages in this folder.
# Usage:  python print\make-qr.py   (needs: pip install qrcode)
import pathlib
import qrcode
import qrcode.image.svg

HERE = pathlib.Path(__file__).parent

CODES = {
    "qr-clinic": "https://santafehunt.com/clinic",
    "qr-shop": "https://santafehunt.com/shop",
    "qr-waiver": "https://waiver.smartwaiver.com/w/uynxuhks8mmj6bgbecunhn/web/",
    # Decoded from the bank app's "My code" screen (Zelle, SANTA FE HUNT / santafehounds@gmail.com).
    # The data param is base64 of {"name","token","action":"payment"}.
    "qr-zelle": "https://enroll.zellepay.com/qr-codes?data=eyJuYW1lIjoiU0FOVEEgRkUgSFVOVCIsInRva2VuIjoic2FudGFmZWhvdW5kc0BnbWFpbC5jb20iLCJhY3Rpb24iOiJwYXltZW50In0=",
}

for name, url in CODES.items():
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=0)
    qr.add_data(url)
    img = qr.make_image(image_factory=qrcode.image.svg.SvgPathImage)
    out = HERE / f"{name}.svg"
    img.save(out)
    print(out.name, "->", url)
