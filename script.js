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

function addButtons(symbols) {
  symbols.forEach((symbol) => {
    let btn = document.createElement("button");
    btn.textContent = symbol;
    numpad.appendChild(btn);
  });
}

function pressButton(event) {
  let buttonText = event.currentTarget.textContent;
  if (buttonText == "AC") {
    clear();
  }

  // if c button was pressed remove the last number that was put in
  else if (buttonText == "C") {
    displayField.textContent = displayField.textContent.substring(
      0,
      displayField.textContent.length - 1
    );
  }

  // if a operator was pressed, then add to previousField
  else if (["+", "-", "÷", "×"].includes(buttonText)) {
    lastOperator = buttonText;
    display("0", displayField.textContent + " " + buttonText);
    displayField.textContent = "0";
  } else if (buttonText == "=") {
    // parse previous number
    let x = Number(
      previousField.textContent.substring(
        0,
        previousField.textContent.length - 2
      )
    );

    // if there is no value stored don't do anything
    if (x == "") {
      return;
    }
    let y = Number(displayField.textContent);

    // remove previous content
    clear();

    // operators
    let operator;

    switch(lastOperator) {
      case "+": operator = add; break;
      case "-": operator = subtract; break;
      case "×": operator = multiply; break;
      case "÷": operator = divide; break;
      default: return;
    }

    display(operate(operator, x, y));

  } else {
    // ensure . can only appear once
    if (buttonText == "." && displayField.textContent.includes(".")) {
      return;
    }

    display(buttonText, previousField.textContent);
  }
}

function display(bottom, top) {
  // remove 0 at the beginning
  if (displayField.textContent == 0) {
    displayField.textContent = bottom;
    return;
  }

  // display content
  displayField.textContent += bottom;
  previousField.textContent = top;
}

function clear() {
  displayField.textContent = "0";
  previousField.textContent = "";
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
const displayField = document.querySelector(".input-bottom");
const previousField = document.querySelector(".input-top");
addButtons(buttonSymbols);
const buttons = document.querySelectorAll("button");
// last operator clicked
let lastOperator = "";

buttons.forEach((b) => {
  b.addEventListener("click", pressButton);
});
