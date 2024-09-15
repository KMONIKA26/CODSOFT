// script.js
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = '';
let isResultDisplayed = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleInput(button.getAttribute('data-value'));
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) || ['+', '-', '*', '/', '.', 'Enter', 'Backspace', 'Escape'].includes(key)) {
        handleInput(key === 'Enter' ? '=' : key === 'Escape' ? 'C' : key);
    }
});

function handleInput(value) {
    if (isResultDisplayed && !['+', '-', '*', '/', 'backspace', '±', '%'].includes(value)) {
        currentInput = '';
        isResultDisplayed = false;
    }

    if (value === 'C') {
        currentInput = '';
        previousInput = '';
        operator = '';
        display.textContent = '0';
        return;
    }

    if (value === 'backspace') {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || '0';
        return;
    }

    if (value === '±') {
        currentInput = currentInput ? (parseFloat(currentInput) * -1).toString() : '';
        display.textContent = currentInput;
        return;
    }

    if (value === '%') {
        currentInput = currentInput ? (parseFloat(currentInput) / 100).toString() : '';
        display.textContent = currentInput;
        return;
    }

    if (value === '=') {
        if (currentInput && previousInput) {
            currentInput = calculate(previousInput, currentInput, operator);
            display.textContent = currentInput;
            previousInput = '';
            operator = '';
            isResultDisplayed = true;
        }
        return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput) {
            if (previousInput) {
                currentInput = calculate(previousInput, currentInput, operator);
                display.textContent = currentInput;
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        }
        return;
    }

    if (value === '.' && currentInput.includes('.')) {
        return;
    }

    currentInput += value;
    display.textContent = currentInput;
}

function calculate(a, b, operator) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    switch (operator) {
        case '+':
            return (num1 + num2).toString();
        case '-':
            return (num1 - num2).toString();
        case '*':
            return (num1 * num2).toString();
        case '/':
            return (num1 / num2).toString();
        default:
            return '';
    }
}
