let numbers = [];
let operations = [];
let currentNumber = '0';
let operationMode = false;

function Reset(num = '0') {
    numbers = [];
    operations = [];
    currentNumber = num;
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



