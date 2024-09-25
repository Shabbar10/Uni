#include <algorithm>
#include <deque>
#include <iostream>
#include <map>
#include <set>
#include <stack>
#include <string>
#include <vector>

std::string send = "send";
std::string more = "more";
std::string money = "money";

bool checkSoln(std::map<char, std::vector<int>> &letterMap) {
  std::string sendCopy = "send";
  std::string moreCopy = "more";
  std::string moneyCopy = "money";

  for (auto &letter : sendCopy) {
    letter = '0' + letterMap[letter].back();
    std::cout << std::endl;
  }

  for (auto &letter : moreCopy) {
    letter = '0' + letterMap[letter].back();
    std::cout << std::endl;
  }

  for (auto &letter : moneyCopy) {
    letter = '0' + letterMap[letter].back();
    std::cout << std::endl;
  }

  int send = std::stoi(sendCopy);
  int more = std::stoi(moreCopy);
  int money = std::stoi(moneyCopy);

  if (send + more == money)
    return true;
  return false;
}

int main() {
  std::string sendCopy = "send";
  std::string moreCopy = "more";
  std::string moneyCopy = "money";

  // Get characters from the 3 strings
  std::set<char> uniqueLetters;

  for (char s : send) {
    uniqueLetters.insert(s);
  }

  for (char s : more) {
    uniqueLetters.insert(s);
  }
  for (char s : money) {
    uniqueLetters.insert(s);
  }

  uniqueLetters.erase('m');

  // Map the letters to their numbers
  std::map<char, std::vector<int>> letterMap;
  letterMap['m'].push_back(1);

  // Map whether a number is used or not
  std::map<int, bool> numMap;
  for (int i = 0; i < 10; i++) {
    numMap[i] = false;
  }
  numMap[1] = true;

  std::map<char, int> latestNums;

  std::stack<char> letterStack;
  std::deque<char> letterDQ;

  for (char letter : uniqueLetters) {
    int numToAssign = 0;
    for (; numToAssign < 10; numToAssign++) {
      if (numMap[numToAssign] == true)
        continue;
      else
        break;
    }

    // Assign a number to a letter
    letterMap[letter].push_back(numToAssign);
    latestNums[letter] = numToAssign;
    // Set that number as used
    numMap[numToAssign] = true;
    // letterStack.push(letter);
    letterDQ.push_back(letter);
  }

  bool solved = checkSoln(letterMap);
  while (!solved && !letterDQ.empty()) {
    // char latest = letterStack.top();
    // letterStack.pop();
    char latest = letterDQ.back();
    letterDQ.pop_back();
    numMap[letterMap[latest].back()] = false;

    std::vector<char> plz;

    int numToAssign = 0;
    bool assigned = false;
    for (auto letter : uniqueLetters) {
      assigned = false;
      if (std::find(letterDQ.begin(), letterDQ.end(), letter) !=
          letterDQ.end()) {
        continue;
      }
      plz.push_back(letter);

      for (; numToAssign < 10; numToAssign++) {
        if (numMap[numToAssign] == true)
          continue;
        if (std::find(letterMap[letter].begin(), letterMap[letter].end(),
                      numToAssign) != letterMap[letter].end()) {
          continue;
        } else {
          letterMap[letter].push_back(numToAssign);
          assigned = true;
          // letterStack.push(latest);
          letterDQ.push_back(letter);
          latestNums[letter] = numToAssign;
          numMap[numToAssign] = true;
          break;
        }
      }

      if (!assigned) {
        break;
      }
    }

    if (!assigned) {
      for (auto each : plz) {
        if (each == latest)
          letterMap[each].clear();
      }
      continue;
    }

    solved = checkSoln(letterMap);
  }

  if (solved)
    std::cout << "Yes";

  std::cout << std::endl;
  return 0;
}
