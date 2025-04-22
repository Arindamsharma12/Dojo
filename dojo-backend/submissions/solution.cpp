#include <iostream>
using namespace std;

int func(int n){
  return n*n;
}

int main() {
    int n;
    cin >> n;
    cout << func(n) << endl;
    return 0;
}
