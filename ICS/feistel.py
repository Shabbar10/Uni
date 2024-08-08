# plain_text = input("Enter plaintext: ")
#
# key1 = int(input("Enter key 1: "))
# key2 = int(input("Enter key 2: "))

plain_text = "0100111101001011"
key1 = int("10100110")
key2 = int("10110111")
keys = [key1, key2]

left_0 = plain_text[0:int((len(plain_text) / 2))]
right_0 = plain_text[int((len(plain_text) / 2)) + 1:]

print(f"left 0 = {left_0}\nright 0 = {right_0}")

prev_left = left_0
prev_right = right_0

for i in range(2):
    next_left = prev_right
    next_right = next_left ^ (prev_right ^ keys[i])

    prev_left = next_left
    prev_right = next_right


print(prev_left, prev_right)
