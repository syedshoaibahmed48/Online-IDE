const SampleCode = {};

SampleCode.c=`#include <stdio.h>

int main() {
  printf("Hello World!");
  return 0;
}`;

SampleCode.cpp=`#include <iostream>
using namespace std;

int main() {
  cout << "C++";
  return 0;
}`;

SampleCode.java=`public class Main {
public static void main(String[] args) {
    System.out.println("Java");
    }
}`;

SampleCode.js=`console.log("JavaScript");`;

SampleCode.py=`print("Python")`;

export default SampleCode;