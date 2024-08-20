const one = document.getElementById("one")
const two = document.getElementById("two")
const three = document.getElementById("three")
const four = document.getElementById("four")
const five = document.getElementById("five")
const six = document.getElementById("six")
const seven = document.getElementById("seven")
const eight = document.getElementById("eight")
const nine = document.getElementById("nine")
const zero = document.getElementById("zero")

const plus = document.getElementById("plus")
const minus = document.getElementById("minus")
const multiply = document.getElementById("multiply")
const divide = document.getElementById("divide")
const equal = document.getElementById("equal")
const clr = document.getElementById("clr")

const numButtons = [one, two, three, four, five, six, seven, eight, nine, zero];
const opButtons = [plus, minus, multiply, divide, equal, clr];

let ans = document.getElementById("ans")
ans.innerText = "";

let num1 = null;
let num2 = null;
let op = null;
let toDo = null;

for (let i = 0; i < numButtons.length; i++) {
  const element = numButtons[i];
  element.onclick = function() { enterNumber(element.value) };
}

for (let i = 0; i < opButtons.length; i++) {
  const element = opButtons[i];
  element.onclick = function() { performOp(element.value) };
}

function enterNumber(type) {
  switch (type) {
    case "1":
      ans.innerText += "1";
      break;
    case "2":
      ans.innerText += "2";
      break;
    case "3":
      ans.innerText += "3";
      break;
    case "4":
      ans.innerText += "4";
      break;
    case "5":
      ans.innerText += "5";
      break;
    case "6":
      ans.innerText += "6";
      break;
    case "7":
      ans.innerText += "7";
      break;
    case "8":
      ans.innerText += "8";
      break;
    case "9":
      ans.innerText += "9";
      break;
    case "0":
      ans.innerText += "0";
      break;
  }
}

function performOp(op) {
  switch (op) {
    case "+":
      toDo = "+";
      num1 = Number(ans.innerText);
      ans.innerText = "";
      break;
    case "-":
      toDo = "-";
      num1 = Number(ans.innerText);
      ans.innerText = "";
      break;
    case "*":
      toDo = "*";
      num1 = Number(ans.innerText);
      ans.innerText = "";
      break;
    case "/":
      toDo = "/";
      num1 = Number(ans.innerText);
      ans.innerText = "";
      break;
    case "=":
      num2 = Number(ans.innerText);
      switch (toDo) {
        case "+":
          ans.innerText = num1 + num2;
          break;
        case "-":
          ans.innerText = num1 - num2;
          break;
        case "*":
          ans.innerText = num1 * num2;
          break;
        case "/":
          ans.innerText = num1 / num2;
          break;
      }
      break;
    case "clr":
      ans.innerText = "";
      num1 = null;
      num2 = null;
      break;
  }
}
