const DEFAULT_VALUE = "0";

const historyScreen = document.getElementById("historyScreen").firstChild;
const inputScreen = document.getElementById("inputScreen").firstChild;
const clearBtn = document.getElementById("clearBtn");
const deleteBtn = document.getElementById("deleteBtn");
const decimalBtn = document.getElementById("decimalBtn");
const divideBtn = document.getElementById("divideBtn");
const multiplyBtn = document.getElementById("multiplyBtn");
const subtractBtn = document.getElementById("subtractBtn");
const addBtn = document.getElementById("addBtn");
const zeroBtn = document.getElementById("zeroBtn");
const oneBtn = document.getElementById("oneBtn");
const twoBtn = document.getElementById("twoBtn");
const threeBtn = document.getElementById("threeBtn");
const fourBtn = document.getElementById("fourBtn");
const fiveBtn = document.getElementById("fiveBtn");
const sixBtn = document.getElementById("sixBtn");
const sevenBtn = document.getElementById("sevenBtn");
const eightBtn = document.getElementById("eightBtn");
const nineBtn = document.getElementById("nineBtn");

clearBtn.onclick = () => evalClear();
deleteBtn.onclick = () => evalDelete();
decimalBtn.onclick = () => evalDecimal();
equalBtn.onclick = () => evalEqual();
divideBtn.onclick = () => evalOperator("÷");
multiplyBtn.onclick = () => evalOperator("×");
subtractBtn.onclick = () => evalOperator("−");
addBtn.onclick = () => evalOperator("+");
zeroBtn.onclick = () => evalNumber(0);
oneBtn.onclick = () => evalNumber(1);
twoBtn.onclick = () => evalNumber(2);
threeBtn.onclick = () => evalNumber(3);
fourBtn.onclick = () => evalNumber(4);
fiveBtn.onclick = () => evalNumber(5);
sixBtn.onclick = () => evalNumber(6);
sevenBtn.onclick = () => evalNumber(7);
eightBtn.onclick = () => evalNumber(8);
nineBtn.onclick = () => evalNumber(9);

window.onload = () => evalClear();

let operand = "";
let lastOperator = "";
let operandList = [];
let errorLogged = false;

function evalNumber(num) {
  if (errorLogged) return;

  operand += num;
  updateScreens();
}

function evalOperator(newOperator) {
  if (errorLogged) return;

  if (operand) appendOperandToList();
  if (operandList.length == 2) {
    operandList = [evalResult(operandList, lastOperator)];
  }

  lastOperator = newOperator;
  updateScreens();
}

function appendOperandToList() {
  operandList.push(Number(operand));
  clearOperand();
}

function evalEqual() {
  if (operand) appendOperandToList();
  if (operandList.length != 2 || !lastOperator || errorLogged) return;

  operandList = [evalResult(operandList, lastOperator)];
  lastOperator = "";
  updateScreens();
}

function evalClear() {
  errorLogged = false;
  lastOperator = "";
  operandList = [];
  clearOperand();
  updateScreens();
  inputScreen.textContent = DEFAULT_VALUE;
}

function evalDelete() {
  if (errorLogged) return;

  operand = operand.slice(0, -1);
  updateScreens();
}

function evalDecimal() {
  evalNumber(".");
}

function evalResult([leftOperand, rightOperand], lastOperator) {
  switch (lastOperator) {
    case "÷":
      if (rightOperand === 0) {
        logError("DIV BY 0 ERROR");
      } else return leftOperand / rightOperand;
    case "×":
      return leftOperand * rightOperand;
    case "−":
      return leftOperand - rightOperand;
    case "+":
      return leftOperand + rightOperand;
  }
}

function clearOperand() {
  operand = "";
}

function logError(error) {
  errorLogged = error;
}

function updateScreens() {
  historyScreen.textContent = errorLogged
    ? errorLogged
    : operandList.join("") + lastOperator;
  inputScreen.textContent = errorLogged ? errorLogged : operand;
}
