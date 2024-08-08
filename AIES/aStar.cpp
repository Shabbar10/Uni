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

std::pair<int, int>
findMinHamming(std::array<std::array<std::pair<int, bool>, 3>, 3> &mat,
               std::array<std::array<int, 3>, 3> &soln) {

  std::array<std::array<std::pair<int, bool>, 3>, 3> tempMat = mat;

  std::vector<int> newHammings;
  std::pair<int, int> blankSpace;
  int recentBuffer = -1;

  // Find initial position of blank space
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (mat[i][j].first == 0)
        blankSpace = std::make_pair(i, j);
    }
  }

  int i = blankSpace.first, j = blankSpace.second;

  if ((i - 1) >= 0) {
    if (tempMat[i - 1][j].second == false) {
      std::swap(tempMat[i][j], tempMat[i - 1][j]);
      newHammings.push_back(checkHamming(tempMat, soln));
      tempMat = mat;
    }
  }

  if ((j + 1) < 3) {
    if (tempMat[i][j + 1].second == false) {
      std::swap(tempMat[i][j], tempMat[i][j + 1]);
      newHammings.push_back(checkHamming(tempMat, soln));
      tempMat = mat;
    }
  }

  if ((i + 1) < 3) {
    if (tempMat[i + 1][j].second == false) {
      std::swap(tempMat[i][j], tempMat[i + 1][j]);
      newHammings.push_back(checkHamming(tempMat, soln));
      tempMat = mat;
    }
  }

  if ((j - 1) < 3) {
    if (mat[i][j - 1].second == false) {
      std::swap(tempMat[i][j], tempMat[i][j - 1]);
      newHammings.push_back(checkHamming(tempMat, soln));
      tempMat = mat;
    }
  }

  int minHamming = newHammings[0], hammingIndex = 0;
  for (int i = 0; i < newHammings.size(); i++) {
    if (minHamming < newHammings[i]) {
      minHamming = newHammings[i];
      hammingIndex = i;
    }
  }

  mat = tempMat;

  return std::make_pair(minHamming, hammingIndex);
}

void aStar(std::array<std::array<std::pair<int, bool>, 3>, 3> mat,
           std::array<std::array<int, 3>, 3> soln) {

  std::array<std::array<std::pair<int, bool>, 3>, 3> tempMat = mat;

  int hamming = checkHamming(mat, soln);
  std::pair<int, int> newHamming;
  int recentBuffer = -1;

  // Start main loop
  while (hamming > 0) {
    std::cout << "Hamming = " << hamming << std::endl;

    newHamming = findMinHamming(tempMat, soln);

    hamming = newHamming.first;
  } // end while

  // print
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      std::cout << mat[i][j].first << " ";
    }
    std::cout << '\n';
  }
}

int main() {
  std::array<std::array<std::pair<int, bool>, 3>, 3> mat{{
      {{std::make_pair(2, true), std::make_pair(8, true),
        std::make_pair(3, true)}},
      {{std::make_pair(1, true), std::make_pair(6, true),
        std::make_pair(4, true)}},
      {{std::make_pair(0, true), std::make_pair(7, true),
        std::make_pair(5, true)}},
  }};

  std::array<std::array<int, 3>, 3> soln{
      {{{1, 2, 3}}, {{8, 0, 4}}, {{7, 6, 5}}}};

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
