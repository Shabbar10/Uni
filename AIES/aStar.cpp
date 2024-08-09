#include <array>
#include <iostream>
#include <utility>
#include <vector>

typedef std::array<std::array<std::pair<int, bool>, 3>, 3> inputMat;
typedef std::array<std::array<int, 3>, 3> solnMat;

// global solution matrix
solnMat soln = {{{{1, 2, 3}}, {{8, 0, 4}}, {{7, 6, 5}}}};

int calcHamming(inputMat &mat) {
  int hamming = 0;

  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (mat[i][j].first == 0)
        continue;

      if (mat[i][j].first != soln[i][j]) {
        hamming++;

        mat[i][j].second = false;
      }
    }
  }

  return hamming;
}

std::pair<int, std::pair<int, int>> findMinHamming(inputMat mat) {
  inputMat reset = mat;

  // find blank space pos
  int blank_r = 0, blank_c = 0;

  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (mat[i][j].first == 0) {
        blank_r = i;
        blank_c = j;
      }
    }
  }

  std::vector<std::pair<int, std::pair<int, int>>> newHamming;

  // check if going up, right, down, left is possible or not
  if ((blank_r - 1) >= 0) {
    if (mat[blank_r - 1][blank_c].second == false) {
      std::swap(mat[blank_r][blank_c], mat[blank_r - 1][blank_c]);
      newHamming.push_back(std::make_pair(
          calcHamming(mat), std::make_pair(blank_r - 1, blank_c)));
      mat = reset;
    }
  }

  if ((blank_c + 1) >= 0) {
    if (mat[blank_r][blank_c + 1].second == false) {
      std::swap(mat[blank_r][blank_c], mat[blank_r][blank_c + 1]);
      newHamming.push_back(std::make_pair(
          calcHamming(mat), std::make_pair(blank_r, blank_c + 1)));
      mat = reset;
    }
  }

  if ((blank_r + 1) >= 0) {
    if (mat[blank_r + 1][blank_c].second == false) {
      std::swap(mat[blank_r][blank_c], mat[blank_r + 1][blank_c]);
      newHamming.push_back(std::make_pair(
          calcHamming(mat), std::make_pair(blank_r + 1, blank_c)));
      mat = reset;
    }
  }

  if ((blank_c - 1) >= 0) {
    if (mat[blank_r][blank_c - 1].second == false) {
      std::swap(mat[blank_r][blank_c], mat[blank_r][blank_c - 1]);
      newHamming.push_back(std::make_pair(
          calcHamming(mat), std::make_pair(blank_r, blank_c - 1)));
      mat = reset;
    }
  }

  // find min from vector
  int minHamming = newHamming[0].first;
  std::pair minHamCoord = newHamming[0].second;
  for (auto it : newHamming) {
    if (it.first < minHamming) {
      minHamming = it.first;
      minHamCoord = it.second;
    }
  }

  return std::make_pair(minHamming, minHamCoord);
}

void aStar(inputMat &mat) {
  inputMat reset = mat;

  int hamming = calcHamming(mat);
  std::pair<int, std::pair<int, int>> nextSwap;

  // find blank space pos
  int blank_r = 0, blank_c = 0;

  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (mat[i][j].first == 0) {
        blank_r = i;
        blank_c = j;
      }
    }
  }

  while (hamming > 0) {
    nextSwap = findMinHamming(mat);

    hamming = nextSwap.first;
    int k = nextSwap.second.first, l = nextSwap.second.second;

    std::swap(mat[blank_r][blank_c], mat[k][l]);
    blank_r = k;
    blank_c = l;
  }

  std::cout << "\nFinal:\n";
  for (int a = 0; a < 3; a++) {
    for (int b = 0; b < 3; b++) {
      std::cout << mat[a][b].first << " ";
    }
    std::cout << std::endl;
  }
}

int main() {
  inputMat mat;
  std::cout << "Enter input matrix:\n";
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      std::cin >> mat[i][j].first;
      mat[i][j].second = true;
    }
  }

  std::cout << "\nEnter solution matrix:\n";
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      std::cin >> soln[i][j];
    }
  }

  aStar(mat);

  std::cout << std::endl;
  return 0;
}
