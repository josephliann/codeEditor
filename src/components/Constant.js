export const languages = {
  javascript: "15.10.0",
  python: "3.10.0",
  java: "15.0.2",
  cpp: "10.2.0",
  c: "10.2.0",
};
export const boilerplates = {
  javascript: `function hello() {
  console.log("Hello World");
}

hello();`,

  python: `def hello():
    print("Hello World")

hello()`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`,

  c: `#include <stdio.h>

int main() {
    printf("Hello World");
    return 0;
}`,

  html: `<!DOCTYPE html>
<html>
<head>
  <title>Document</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`,

  css: `body {
  background-color: white;
  color: black;
}`,

  typescript: `function hello(): void {
  console.log("Hello World");
}

hello();`,
};
