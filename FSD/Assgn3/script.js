const form = document.getElementsByTagName('form')
const sumBtn = document.getElementById("sum");
const subBtn = document.getElementById("sub");
const mulBtn = document.getElementById("mul");
const divBtn = document.getElementById("div");
let ans = document.getElementById("ans")

form[0].reset()
let count = 0;

function calcFn(type) {
  let val1 = document.getElementById("val1").value;
  let val2 = document.getElementById("val2").value;

  if (val1 === "" || val2 === "") {
    alert("Fill it all");
    count = count + 1;
    return;
  }

  val1 = Number(val1);
  val2 = Number(val2);

  switch (type) {
    case "+": {
      ans.innerText = val1 + val2;
      break;
    }
    case "-": {
      ans.innerText = val1 - val2;
      break;
    }
    case "*": {
      ans.innerText = val1 * val2;
      break;
    }
    case "/": {
      ans.innerText = val1 / val2;
      break;
    }
    default:
      break;
  }
}

sumBtn.onclick = function() { calcFn("+"); };
subBtn.onclick = function() { calcFn("-"); };
mulBtn.onclick = function() { calcFn("*"); };
divBtn.onclick = function() { calcFn("/"); };

