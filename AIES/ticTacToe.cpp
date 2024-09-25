#include <array>
#include <iostream>
#include <utility>
#include <vector>

typedef std::array<std::array<char, 3>, 3> matrix;

std::vector<int> gameStates;
std::vector<char> gameMoves;

bool checkFilledBoard(const matrix &gameBoard) {
  int count = 0;
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (gameBoard[i][j] != '\0')
        count++;
    }
  }

  if (count < 9)
    return false;
  return true;
}

bool checkLine(const matrix &gameBoard, int x1, int y1, int x2, int y2, int x3, int y3) {
  if (gameBoard[x1][y1] == gameBoard[x2][y2] && gameBoard[x1][y1] == gameBoard[x3][y3] && gameBoard[x2][y2] == gameBoard[x3][y3])
    return true;

  return false;
}

std::pair<char, bool> checkWinCondition(const matrix &gameBoard) {
  // Check the 3 verticals
  if (checkLine(gameBoard, 0, 0, 1, 0, 2, 0) &&
    gameBoard[0][0] != '\0')
    return std::make_pair(gameBoard[0][0], true);
  if (checkLine(gameBoard, 0, 1, 1, 1, 2, 1) &&
    gameBoard[0][1] != '\0')
    return std::make_pair(gameBoard[0][1], true);
  if (checkLine(gameBoard, 0, 2, 1, 2, 2, 2) &&
    gameBoard[0][2] != '\0')
    return std::make_pair(gameBoard[0][2], true);

  // Check the three horizontals
  if (checkLine(gameBoard, 0, 0, 0, 1, 0, 2) &&
    gameBoard[0][0] != '\0')
    return std::make_pair(gameBoard[0][0], true);
  if (checkLine(gameBoard, 1, 0, 1, 1, 1, 2) &&
    gameBoard[1][0] != '\0')
    return std::make_pair(gameBoard[1][0], true);
  if (checkLine(gameBoard, 2, 0, 2, 1, 2, 2) &&
    gameBoard[2][0] != '\0')
    return std::make_pair(gameBoard[2][0], true);

  // Check the 2 diagonals
  if (checkLine(gameBoard, 0, 0, 1, 1, 2, 2) &&
    gameBoard[0][0] != '\0')
    return std::make_pair(gameBoard[0][0], true);
  if (checkLine(gameBoard, 0, 2, 1, 1, 2, 0) &&
    gameBoard[0][2] != '\0')
    return std::make_pair(gameBoard[0][2], true);

  // First param doesn't matter in case of false
  return std::make_pair(gameBoard[0][0], false);
}

// Function to generate all possible movies
void generateALlMoves(matrix &gameBoard, char move, int depth) {
  // Go thru the gameBoard row-wise
  // Fill the first empty cell with the move
  // Then recurseively pass the game to the function to generate the branch
  // After reaching leaf or gameend start Minimaxing

  std::pair win = checkWinCondition(gameBoard);
  bool boardFull = checkFilledBoard(gameBoard);

  if (!win.second && !boardFull) {
    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        if (gameBoard[i][j] == '\0') {
          gameBoard[i][j] = move;

          if (move == 'O')
            generateALlMoves(gameBoard, 'X', depth + 1);
          else
            generateALlMoves(gameBoard, 'O', depth + 1);
        }
      }
    }
  }

  // TODO handle what happens when a branch finally returns i.e. Minimax
  if (win.second == true) { // If someone won
    if (win.first == 'O') {
      gameStates.push_back(10 - depth);
      gameMoves.push_back('O');
      return;
    }
    else {
      gameStates.push_back(depth - 10);
      gameMoves.push_back('X');
      return;
    }
  } else { // Draw
    gameStates.push_back(0);
    gameMoves.push_back(move);
    return;
  }
}

int main() {
  // Filled with \0
  matrix gameBoard{};

  // First player O (max)
  char move = 'O';

  while (true) {
    generateALlMoves(gameBoard, move, 0);
  }

  std::cout << std::endl;
  return 0;
}
