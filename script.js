function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(operator, x, y) {
  return operator(x, y);
}

function addButtons(symbols, numpad) {
  symbols.forEach((symbol) => {
    let btn = document.createElement("button") ;
    btn.textContent = symbol;
    numpad.appendChild(btn);
  })
}

function display(value, previousValue) {
  let displayField = document.querySelector(".input-bottom");
  let previousField = document.querySelector(".input-top");
  displayField.textContent = value;
  previousField.textContent = previousValue;
}

const buttonSymbols = [
  "7",
  "8",
  "9",
  "÷",
  "4",
  "5",
  "6",
  "×",
  "1",
  "2",
  "3",
  "-",
  ".",
  "0",
  "=",
  "+",
];

const numpad = document.querySelector(".numpad");
addButtons(buttonSymbols, numpad);

// eventlistener