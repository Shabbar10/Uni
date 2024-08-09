#include <algorithm>
#include <array>
#include <iostream>
#include <utility>
#include <vector>

int checkHamming(std::array<std::array<std::pair<int, bool>, 3>, 3> &mat,
                 std::array<std::array<int, 3>, 3> &soln) {
  int hamming = 0;

  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (mat[i][j].first == 0)
        continue;

      if (mat[i][j].first != soln[i][j]) {
        hamming++;
        mat[i][j].second = false;
      } else
        mat[i][j].second = true;
    }
  }

  return hamming;
}

std::pair<int, std::pair<int, int>>
findMinHamming(std::array<std::array<std::pair<int, bool>, 3>, 3> &mat,
               std::array<std::array<int, 3>, 3> &soln) {

  std::array<std::array<std::pair<int, bool>, 3>, 3> tempMat = mat;

  std::vector<std::pair<int, std::pair<int, int>>> newHammings;
  std::pair<int, int> blankSpace;

  // Find initial position of blank space
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (mat[i][j].first == 0) {
        blankSpace = std::make_pair(i, j);
        break;
      }
    }
  }

  int i = blankSpace.first, j = blankSpace.second;
  int hamming = checkHamming(tempMat, soln);
  std::array<std::array<std::pair<int, bool>, 3>, 3> reset = tempMat;

  if ((i - 1) >= 0) {
    if (tempMat[i - 1][j].second == false) {
      std::swap(tempMat[i][j], tempMat[i - 1][j]);
      newHammings.push_back(std::make_pair(checkHamming(tempMat, soln),
                                           std::make_pair(i - 1, j)));
      tempMat = reset;
    }
  }

  if ((j + 1) < 3) {
    if (tempMat[i][j + 1].second == false) {
      std::swap(tempMat[i][j], tempMat[i][j + 1]);
      newHammings.push_back(std::make_pair(checkHamming(tempMat, soln),
                                           std::make_pair(i, j + 1)));
      tempMat = reset;
    }
  }

  if ((i + 1) < 3) {
    if (tempMat[i + 1][j].second == false) {
      std::swap(tempMat[i][j], tempMat[i + 1][j]);
      newHammings.push_back(std::make_pair(checkHamming(tempMat, soln),
                                           std::make_pair(i + 1, j)));
      tempMat = reset;
    }
  }

  if ((j - 1) < 3) {
    if (mat[i][j - 1].second == false) {
      std::swap(tempMat[i][j], tempMat[i][j - 1]);
      newHammings.push_back(std::make_pair(checkHamming(tempMat, soln),
                                           std::make_pair(i, j - 1)));
      tempMat = reset;
    }
  }

  int minHamming = newHammings[0].first;
  std::pair<int, int> coord = newHammings[0].second;
  for (auto it : newHammings) {
    if (minHamming > it.first) {
      minHamming = it.first;
      coord = it.second;
    }
  }

  return std::make_pair(minHamming, coord);
}

void aStar(std::array<std::array<std::pair<int, bool>, 3>, 3> mat,
           std::array<std::array<int, 3>, 3> soln) {

  std::array<std::array<std::pair<int, bool>, 3>, 3> tempMat = mat;

  int hamming = checkHamming(tempMat, soln);
  std::pair<int, std::pair<int, int>> newHamming;

  std::pair<int, int> blankSpace;

  // Find initial position of blank space
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (mat[i][j].first == 0) {
        blankSpace = std::make_pair(i, j);
        break;
      }
    }
  }

  int i = blankSpace.first, j = blankSpace.second;

  // Start main loop
  while (hamming > 0) {
    newHamming = findMinHamming(tempMat, soln);
    hamming = newHamming.first;

    std::cout << "First: " << newHamming.first;
    std::cout << "Second: " << newHamming.second.first << ", "
              << newHamming.second.second << "\n\n";

    int k = newHamming.second.first, l = newHamming.second.second;
    tempMat[k][l].second = true;
    std::swap(tempMat[i][j], tempMat[k][l]);
    i = k;
    j = l;
  } // end while

  // print
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      std::cout << mat[i][j].first << " ";
    }
    std::cout << '\n';
  }

  std::cout << "\n\n";

  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      std::cout << tempMat[i][j].first << " ";
    }
    std::cout << '\n';
  }
}

int main() {
  std::array<std::array<std::pair<int, bool>, 3>, 3> mat{{
      {{std::make_pair(1, true), std::make_pair(2, true),
        std::make_pair(3, true)}},
      {{std::make_pair(0, true), std::make_pair(4, true),
        std::make_pair(5, true)}},
      {{std::make_pair(7, true), std::make_pair(8, true),
        std::make_pair(6, true)}},
  }};

  std::array<std::array<int, 3>, 3> soln{
      {{{1, 2, 3}}, {{4, 5, 6}}, {{7, 8, 0}}}};

  // std::cout << "Enter matrix:\n";
  // for (int i = 0; i < 3; i++) {
  //   for (int j = 0; j < 3; j++) {
  //     std::cin >> mat[i][j].first;
  //     mat[i][j].second = true;
  //   }
  // }
  //
  // std::cout << "Enter solution:\n";
  // for (int i = 0; i < 3; i++) {
  //   for (int j = 0; j < 3; j++) {
  //     std::cin >> soln[i][j];
  //   }
  // }

  aStar(mat, soln);

  std::cout << std::endl;
  return 0;
}
