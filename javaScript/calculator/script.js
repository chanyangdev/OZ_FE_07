const buttons = document.querySelectorAll(".button");
const display = document.getElementById("display");
const clearButton = document.getElementById("clear");

let firstOperand = "";
let secondOperand = "";
let operator = null;
let awaitingSecondOperand = false;
let resultDisplayed = false;

// Updates the display content with the provided value
const updateDisplay = (content) => {
  display.textContent = content;
};

// Resets the calculator state
const resetCalculator = () => {
  firstOperand = "";
  secondOperand = "";
  operator = null;
  awaitingSecondOperand = false;
  resultDisplayed = false;
  updateDisplay("0");
};

// Handles number button clicks
const handleNumberInput = (number) => {
  if (resultDisplayed) {
    // Start fresh if a new input follows a result
    resetCalculator();
  }
  
  if (awaitingSecondOperand) {
    // Start building the second operand
    secondOperand += number;
    updateDisplay(firstOperand + " " + operator + " " + secondOperand);
  } else {
    // Build the first operand
    firstOperand += number;
    updateDisplay(firstOperand);
  }
};

// Handles decimal input, ensuring only one decimal is added per operand
const handleDecimalInput = () => {
  if (awaitingSecondOperand && !secondOperand.includes(".")) {
    secondOperand += ".";
    updateDisplay(firstOperand + " " + operator + " " + secondOperand);
  } else if (!awaitingSecondOperand && !firstOperand.includes(".")) {
    firstOperand += ".";
    updateDisplay(firstOperand);
  }
};

// Handles operator input, displaying it and preparing for the second operand
const handleOperatorInput = (selectedOperator) => {
  if (!firstOperand) return;

  if (awaitingSecondOperand) {
    operator = selectedOperator; // Change the operator if already chosen
    updateDisplay(firstOperand + " " + operator);
  } else {
    operator = selectedOperator;
    awaitingSecondOperand = true;
    updateDisplay(firstOperand + " " + operator); // Show the first operand and operator
  }
};

// Performs the calculation and returns the result
const calculate = (firstOperand, operator, secondOperand) => {
  const firstNum = parseFloat(firstOperand);
  const secondNum = parseFloat(secondOperand);

  if (isNaN(firstNum) || isNaN(secondNum)) return "";

  switch (operator) {
    case "+":
      return firstNum + secondNum;
    case "-":
      return firstNum - secondNum;
    case "*":
      return firstNum * secondNum;
    case "/":
      return secondNum !== 0 ? firstNum / secondNum : "Error";
    default:
      return secondNum;
  }
};

// Handles "=" button click to calculate and show the final result
const handleEqualInput = () => {
  if (!operator || !secondOperand) return;

  const result = calculate(firstOperand, operator, secondOperand);
  updateDisplay(result); // Display the final result

  // Store result as firstOperand for further calculations
  firstOperand = result.toString();
  secondOperand = "";
  operator = null;
  awaitingSecondOperand = false;
  resultDisplayed = true;
};

// Adds event listeners to each button for handling clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      handleNumberInput(button.textContent);
    } else if (button.textContent === ".") {
      handleDecimalInput();
    } else if (button.classList.contains("operator")) {
      handleOperatorInput(button.textContent);
    } else if (button.classList.contains("equal")) {
      handleEqualInput();
    } else if (button.id === "clear") {
      resetCalculator();
    }
  });
});