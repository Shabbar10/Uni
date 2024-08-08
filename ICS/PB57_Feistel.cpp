#include <bitset>
#include <iostream>
#include <ostream>
#include <sstream>
#include <string>
#include <vector>

std::string encypt(std::string plainText, std::string key1, std::string key2) {
  std::stringstream ss(plainText);
  std::string left, right;
  ss >> left >> right;

  std::bitset<8> left_0(left);
  std::bitset<8> right_0(right);
  std::bitset<8> k1(key1);
  std::bitset<8> k2(key2);

  std::vector<std::bitset<8>> v{k1, k2};

  std::bitset<8> prev_left = left_0;
  std::bitset<8> prev_right = right_0;

  for (int i = 0; i < 2; i++) {
    std::bitset<8> next_left = prev_right;
    std::bitset<8> next_right = prev_left ^ (prev_right ^ v[i]);

    prev_left = next_left;
    prev_right = next_right;
  }

  std::string result = prev_right.to_string() + " " + prev_left.to_string();

  return result;
}

std::string decrypt(std::string cipherText, std::string key1,
                    std::string key2) {
  std::stringstream ss(cipherText);
  std::string left, right;
  ss >> left >> right;

  std::bitset<8> left_0(left);
  std::bitset<8> right_0(right);
  std::bitset<8> k1(key1);
  std::bitset<8> k2(key2);

  std::vector<std::bitset<8>> v{k2, k1};

  std::bitset<8> prev_left = left_0;
  std::bitset<8> prev_right = right_0;

  for (int i = 0; i < 2; i++) {
    std::bitset<8> next_left = prev_right;
    std::bitset<8> next_right = prev_left ^ (prev_right ^ v[i]);

    prev_left = next_left;
    prev_right = next_right;
  }

  std::string result = prev_right.to_string() + " " + prev_left.to_string();

  return result;
}

void displayMenu() {

  char op;

  do {
    std::cout << "FESITEL CIPHER\n\n";
    std::cout
        << "Select an option:\n1. Encryption\n2. Decyption\n3. Exit\n\n>> ";
    std::cin >> op;
    std::cin.ignore();

    switch (op) {
    case '1': {
      std::string plainText{"01001111 01001011"};
      std::cout << "Enter plain text (space-separated): ";
      std::getline(std::cin, plainText);

      std::string key1{}, key2{};
      std::cout << "Enter keys:\nk1: ";
      std::cin >> key1;
      std::cout << "k2: ";
      std::cin >> key2;

      std::cout << "The cipher is: " << encypt(plainText, key1, key2)
                << std::endl
                << std::endl;
      break;
    }
    case '2': {
      std::string cipherText{"01001111 01001011"};
      std::cout << "Enter cipher text (space-separated): ";
      std::getline(std::cin, cipherText);

      std::string key1{}, key2{};
      std::cout << "Enter keys:\nk1: ";
      std::cin >> key1;
      std::cout << "k2: ";
      std::cin >> key2;

      std::cout << "The plain text is: " << decrypt(cipherText, key1, key2)
                << std::endl
                << std::endl;
      break;
    }
    case '3': {
      std::cout << "Bye, lad\n\n";
      break;
    }
    default: {
      std::cerr << "Please select a valid option.\n\n";
    }
    }
  } while (op != '3');
}

int main() {
  displayMenu();

  std::cout << std::endl;
  return 0;
}
