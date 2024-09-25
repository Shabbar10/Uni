from hashlib import md5

plain_text = b"World"

cipher = md5(plain_text)
print(cipher.digest())