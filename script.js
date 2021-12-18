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

function calculate() {
  // parse previous number
  let x = Number(
    previousField.textContent.substring(0, previousField.textContent.length - 2)
  );

  // if there is no value stored don't do anything
  if (x == "") {
    return;
  }
  let y = Number(displayField.textContent);

  console.log(lastOperator, y);

  // lmao at divide by 0
  if (lastOperator == "÷" && y == 0) {
    display("lmao", "10");
    return;
  }
  // remove previous content
  clear();

  // operators
  let operator;

  switch (lastOperator) {
    case "+":
      operator = add;
      break;
    case "-":
      operator = subtract;
      break;
    case "×":
      operator = multiply;
      break;
    case "÷":
      operator = divide;
      break;
    default:
      return;
  }
  let result = operate(operator, x, y);
  // round result if it is too long
  if (String(result).length >= 14) {
    result = Math.round(result * 10e12) / 10e12;
    result = result.toPrecision(12);
  }
  return result;
}

function pressButton(event) {
  let buttonText = event.currentTarget.textContent;
  doButton(buttonText);
}

function doButton(buttonText) {
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
    // if there is already an operation in the previous field then calculate
    if (previousField.textContent) {
      previousField.textContent = calculate() + " " + buttonText;
      lastOperator = buttonText;
      return;
    }
    lastOperator = buttonText;
    display("0", displayField.textContent + " " + buttonText);
    displayField.textContent = "0";
  } else if (buttonText == "=") {
    let result = calculate();
    console.log(Boolean(result));
    if (result) {
      display(result);
    } else {
      return;
    }
  } else if (buttonText == "." && displayField.textContent.includes(".")) {
    // ensure . can only appear once
    return;
  } else if (displayField.textContent.length >= 14) {
    alert("Too many numbers");
    return;
  } else {
    display(buttonText, previousField.textContent);
  }
}

function display(bottom, top) {
  // remove 0 at the beginning
  if (
    displayField.textContent == 0 ||
    displayField.textContent == "Infinity" ||
    displayField.textContent == "lmao" ||
    displayField.textContent == "NaN"
  ) {
    displayField.textContent = bottom;
    return;
  }
  /*
  if (displayField.textContent.length >= 14) {
    alert("toolong");
  }
  */

  // display content
  displayField.textContent += bottom;
  previousField.textContent = top;
}

function clear() {
  displayField.textContent = "0";
  previousField.textContent = "";
}

function pressKey(event) {
  let key = event.key;
  console.log(key);
  if (key == "*") {
    key = "×";
  }
  if (key == "/") {
    key = "÷";
  }
  if (key == "Enter") {
    key = "=";
  }
  if (key == "Backspace") {
    doButton("C");
  }
  if (buttonSymbols.includes(key)) {
    doButton(key);
  }
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
let lastOperator;

buttons.forEach((b) => {
  b.addEventListener("click", pressButton);
});

// add keyboard support
document.addEventListener("keydown", pressKey);
