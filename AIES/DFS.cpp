#include <iostream>
#include <queue>

using namespace std;

struct Node {
  int data;
  Node *left;
  Node *right;
  Node() {
    left = nullptr;
    right = nullptr;
  }
};

void DFS_inorder(Node *root, int data, bool &found) {
  if (root == nullptr) {
    return;
  }
  DFS_inorder(root->left, data, found);
  cout << root->data << " ";
  if (root->data == data) {
    found = true;
  }
  DFS_inorder(root->right, data, found);
}

void DFS_preorder(Node *root, int data, bool &found) {
  if (root == nullptr) {
    return;
  }
  cout << root->data << " ";
  if (root->data == data) {
    found = true;
  }
  DFS_preorder(root->left, data, found);
  DFS_preorder(root->right, data, found);
}

void DFS_postorder(Node *root, int data, bool &found) {
  if (root == nullptr) {
    return;
  }
  DFS_postorder(root->left, data, found);
  DFS_postorder(root->right, data, found);
  cout << root->data << " ";
  if (root->data == data) {
    found = true;
  }
}

Node *createTree() {
  int data;
  cout << "Enter the root data: ";
  cin >> data;

  Node *root = new Node();
  root->data = data;
  queue<Node *> q;
  q.push(root);

  while (!q.empty()) {
    Node *current = q.front();
    q.pop();

    char choice;
    int value;

    cout << "Enter left child of " << current->data
         << " (-1 for no left child): ";
    cin >> value;
    if (value != -1) {
      current->left = new Node();
      current->left->data = value;
      q.push(current->left);
    }

    cout << "Enter right child of " << current->data
         << " (-1 for no right child): ";
    cin >> value;
    if (value != -1) {
      current->right = new Node();
      current->right->data = value;
      q.push(current->right);
    }
  }
  return root;
}

int main() {
  Node *root = createTree();

  int data;
  cout << "Enter the data to be found: ";
  cin >> data;

  bool found = false;

  cout << "Inorder Traversal: ";
  DFS_inorder(root, data, found);
  cout << endl;
  if (found == true) {
    cout << "Element Found" << endl;
  } else {
    cout << "Element not found" << endl;
  }

  found = false;
  cout << "Preorder Traversal: ";
  DFS_preorder(root, data, found);
  cout << endl;
  if (found == true) {
    cout << "Element Found" << endl;
  } else {
    cout << "Element not found" << endl;
  }

  found = false;
  cout << "Postorder Traversal: ";
  DFS_postorder(root, data, found);
  cout << endl;
  if (found == true) {
    cout << "Element Found" << endl;
  } else {
    cout << "Element not found" << endl;
  }
}
