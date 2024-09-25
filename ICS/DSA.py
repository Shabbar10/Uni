from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding, rsa

private_key = rsa.generate_private_key(public_exponent=65537, key_size=512)

public_key = private_key.public_key()

message = b"Send dudes"
message2 = b"Send guys"

signature = private_key.sign(
    message,
    padding.PSS(mgf=padding.MGF1(hashes.SHA256()), salt_length=padding.PSS.MAX_LENGTH),
    hashes.MD5(),
)

print(f"Signature: {signature}\n")

try:
    public_key.verify(
        signature,
        message2,
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()), salt_length=padding.PSS.MAX_LENGTH
        ),
        hashes.MD5(),
    )
    print("Signature is valid")
except Exception as e:
    print("Signature is not valid")
