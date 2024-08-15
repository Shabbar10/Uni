#include <algorithm>
#include <iostream>
#include <stack>

class Node {
private:
  int val;
  char type; // 0 for max, 1 min, 2 for leaf/value
  Node *left;
  Node *right;

public:
  Node() : val(0), type('0'), left(nullptr), right(nullptr) {}
  friend class Tree;
};

class Tree {
private:
  Node *root;

  Node *create(Node *, char);
  int DFS(Node *);

public:
  Tree() : root(nullptr) {}

  void create();
  void DFS();
  int minMax(int, int);
  void printFinal();
};

void Tree::create() { root = create(root, '0'); }

Node *Tree::create(Node *root, char type) {
  root = new Node;
  char isLeaf;
  std::cout << "Is it a leaf node? ";
  std::cin >> isLeaf;

  if (isLeaf != 'y') {
    root->type = type;

    char nextType;
    if (type == '0')
      nextType = '1';
    else if (type == '1')
      nextType = '0';

    // char askChildren;
    // std::cout << "\nHas left child? ";
    // std::cin >> askChildren;
    //
    // if (askChildren == 'y') {
    //   root->left = create(root->left, nextType);
    // }
    //
    // std::cout << "\nHas right child? ";
    // std::cin >> askChildren;
    //
    // if (askChildren == 'y') {
    //   root->right = create(root->right, nextType);
    // }

    root->left = create(root->left, nextType);
    root->right = create(root->right, nextType);

    type = nextType;
  } else {
    root->type = '2';
    std::cout << "Value: ";
    std::cin >> root->val;
  }

  return root;
}

void Tree::DFS() { std::cout << DFS(root) << std::endl; }

int Tree::DFS(Node *root) {
  if (root != nullptr) {
    if (root->type == '2')
      return root->val;

    int lval = DFS(root->left);
    int rval = DFS(root->right);

    if (root->type == '0')
      return std::max(lval, rval);
    else if (root->type == '1')
      return std::min(lval, rval);
  }

  return -1;
}

int main() {
  Tree t;
  t.create();
  t.DFS();

  std::cout << std::endl;
  return 0;
}
