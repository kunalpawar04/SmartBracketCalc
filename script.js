// Storing IDs inside an array
let digitsArray = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

// Will display the output
let resultElement = document.querySelector(".result");

// Function to handle button clicks
function handleButtonClick(event) {
  let clickedID = event.target.id;
  let clickedIndex = digitsArray.indexOf(clickedID);

  if (clickedIndex !== -1) {
    if (
      resultElement.innerHTML.length === 1 &&
      resultElement.innerHTML[resultElement.innerHTML.length - 1] === "0"
    ) {
      resultElement.innerHTML = clickedIndex;
    } else {
      resultElement.innerHTML += clickedIndex;
    }
  }
}

// Adding click event listeners to buttons
for (let i = 0; i < digitsArray.length; i++) {
  let button = document.getElementById(digitsArray[i]);
  button.addEventListener("click", handleButtonClick);
}

// Storing operators inside an array
let operatorsArray = ["modulo", "divide", "multiply", "minus", "plus"];

// Function to handle operator clicks
function handleOperatorClick(event) {
  let clickedButton = event.target;
  let clickedOperator = clickedButton.innerHTML;

  let lastChar = resultElement.innerHTML.slice(-1);
  if (!isNaN(lastChar) || lastChar === ")") {
    resultElement.innerHTML += clickedOperator;
  } else {
    if (lastChar === "(" && clickedOperator === "-") {
      resultElement.innerHTML += clickedOperator;
    }
  }
}

// Adding click event listeners to buttons
for (let i = 0; i < operatorsArray.length; i++) {
  let button = document.getElementById(operatorsArray[i]);
  button.addEventListener("click", handleOperatorClick);
}

//Handling Equal To function
function finalAns() {
  try {
    let ans = eval(resultElement.innerHTML);
    resultElement.innerHTML = ans;
  } catch (error) {
    return "Error: Invalid expression";
  }
}

document.getElementById("equal-to").addEventListener("click", finalAns);

//All clear function
function erase() {
  resultElement.innerHTML = 0;
}
document.getElementById("AC").addEventListener("click", erase);

//BackSpace function
function backspace() {
  if (resultElement.innerHTML.length != 1) {
    resultElement.innerHTML = resultElement.innerHTML.slice(0, -1);
  } else {
    resultElement.innerHTML = 0;
  }
}
document.getElementById("Bksp").addEventListener("click", backspace);

//Decimal operator function
function addDecimal(event) {
  let clickedButton = event.target;
  let clickedOperator = clickedButton.innerHTML;

  let index = resultElement.innerHTML.length - 1;
  let dotCount = 0;

  while (index >= 0) {
    let tmp = resultElement.innerHTML.charAt(index);

    if (tmp === ".") {
      ++dotCount;
    } else if (
      tmp === "+" ||
      tmp === "-" ||
      tmp === "*" ||
      tmp === "/" ||
      tmp === "%"
    ) {
      break;
    }

    --index;
  }

  if (dotCount === 0) {
    resultElement.innerHTML += clickedOperator;
  }
}
document.getElementById("dot").addEventListener("click", addDecimal);

//Bracket insertion
function addBrackets() {
  let lastChar = resultElement.innerHTML.slice(-1);
  if ((lastChar < "0" || lastChar > "9") && lastChar !== ")") {
    // If last element is an arithmetic operator or not a number
    resultElement.innerHTML += "(";
  } else {
    // If it is a number
    let countOpen = 0;
    let countClose = 0;

    let dummy = resultElement.innerHTML;
    for (let i = 0; i < dummy.length; i++) {
      if (dummy[i] === "(") {
        countOpen++;
      } else if (dummy[i] === ")") {
        countClose++;
      }
    }

    if (countOpen > countClose) {
      resultElement.innerHTML += ")";
    }
  }
}

document.getElementById("brackets").addEventListener("click", addBrackets);
