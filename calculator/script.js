let numbers = [];
let operations = [];
let currentNumber = '0';
let operationMode = false;

function Reset(num = '0') {
    numbers = [];
    operations = [];
    currentNumber = num;
}

function numberPress(num) {
    currentNumber === '0' ? currentNumber = num : currentNumber += num;
    updateDisplay(currentNumber);
    operationMode = true;
}
function operatorPress(operator) {
    if (!operationMode) {
        return;
    }

    operations.push(operator);
    numbers.push(currentNumber);

    if (operator === 'equal') {
        currentNumber = Calculate();
        updateDisplay(currentNumber);
        Reset(currentNumber);
    } else {
        currentNumber = '0';
        updateDisplay();
        operationMode = false;
    }
}

function Calculate() {
    let total = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (i === 0) {
            total = Number.parseFloat(numbers[i]);
        } else {
            total = Operate(total, Number.parseFloat(numbers[i]), operations[i - 1]);
        }
    }

    return `${total}`;
}

function Operate(number1, number2, operation) {
    switch (operation) {
        case 'add':
            return number1 + number2;

        case 'subtract':
            return number1 - number2;

        case 'multiply':
            return number1 * number2;

        case 'divide':
            return number1 / number2;

        default:
            return '0';
    }
}



function updateDisplay(num = '0') {
    const digitCount = num.length;
    const displayElement = document.getElementById('display');

    if (digitCount >= 11 && digitCount < 15) {
        displayElement.style.fontSize = '20px';
    } else if (digitCount >= 15) {
        displayElement.style.fontSize = '15px';
    } else {
        displayElement.style.fontSize = '28px';
    }

    displayElement.innerText = num;
}

function handleButtonPress(btnId) {
    if (btnId === 'dot') {
        currentNumber = currentNumber + '.';
        updateDisplay(currentNumber);
    } else if (btnId === 'clear') {
        Reset();
        updateDisplay();
    } else if (!isNaN(Number.parseInt(btnId))) {
        numberPress(btnId);
    } else {
        operatorPress(btnId);
    }
}

function init() {
    Array.from(document.getElementsByClassName('btn'))
        .forEach(btn => {
            btn.addEventListener('click', () => handleButtonPress(btn.id))
        });
}

window.addEventListener('DOMContentLoaded', init);