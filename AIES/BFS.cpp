#include <iostream>
#include <queue>
#include <vector>
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

void BFS(Node *root, int data) {
  int flag = 0;
  vector<vector<int>> ans;
  if (root == NULL) {
    cout << "Empty tree" << endl;
  }
  Node *temp = root;
  int p = 1;
  int r = 0;
  queue<Node *> q;
  q.push(temp);
  while (!q.empty()) {
    vector<int> a;
    for (int i = 0; i < p; i++) {
      temp = q.front();
      q.pop();
      if (temp->data == data) {

        flag = 1;
      }
      a.push_back(temp->data);
      if (temp->left != nullptr) {
        q.push(temp->left);
        r++;
      }
      if (temp->right != nullptr) {
        q.push(temp->right);
        r++;
      }
    }
    ans.push_back(a);
    p = r;
    r = 0;
  }

  for (int i = 0; i < ans.size(); i++) {
    for (int j = 0; j < ans[i].size(); j++) {
      cout << ans[i][j] << " ";
    }
    cout << endl;
  }
  if (flag == 1) {
    cout << "Element found";
    return;
  } else {
    cout << "Element not found";
    return;
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

  BFS(root, data);

  return 0;
}
