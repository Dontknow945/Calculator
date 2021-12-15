/* initialize */
const display = document.querySelector('.display'),
    clrBtn = document.querySelector('.clear'),
    addBtn = document.querySelector('.add'),
    subBtn = document.querySelector('.subtract'),
    mulBtn = document.querySelector('.multiply'),
    divBtn = document.querySelector('.divide'),
    equBtn = document.querySelector('.equals'),
    pointBtn = document.querySelector('.point'),
    zeroBtn = document.querySelector('.zero'),
    oneBtn = document.querySelector('.one'),
    twoBtn = document.querySelector('.two'),
    threeBtn = document.querySelector('.three'),
    fourBtn = document.querySelector('.four'),
    fiveBtn = document.querySelector('.five'),
    sixBtn = document.querySelector('.six'),
    sevenBtn = document.querySelector('.seven'),
    eightBtn = document.querySelector('.eight'),
    nineBtn = document.querySelector('.nine');

let solution = '0',
    num1 = '', 
    num2 = '',
    operator = '';


/* functions */
function populateDisplay() {
    display.textContent = solution;
}

function numberPressed() {
    if (operator === '') {
        num1 += this.id;
        solution = num1;
    } else if (operator === 'equals') {
        num1 = this.id;
        solution = num1;
        operator = '';
    } else {
        num2 += this.id;
        solution = num2;
    }
    populateDisplay();
    if (this.classList[0] === 'point') {
        pointBtn.removeEventListener('click', numberPressed);
    }
}

function operatorPressed() {
    if (num1 === '') {
        num1 = '0';
    }
    if (operator === '' || operator === 'equals' || num2 === '') {
        operator = this.classList[0];
    } else {
        if (num2 === '0' && operator === 'divide') {
            solution = 'Do not divide numbers by 0.';
            num1 = '';
            num2 = '';
            operator = '';
        } else {
            solution = operate(parseNumber(num1), parseNumber(num2));
            operator = this.classList[0];
            num1 = solution;
            num2 = '';
        }
    }
    populateDisplay();
    pointBtn.addEventListener('click', numberPressed);
}

function equalsPressed() {
    if (operator === '' || num2 === '') {
        solution = 'error!';
        num1 = '';
    } else {
        if (num2 === '0' && operator === 'divide') {
            solution = 'Do not divide numbers by 0.';
            num1 = '';
            num2 = '';
            operator = '';
        } else {
            solution = operate(parseNumber(num1), parseNumber(num2));
            operator = this.classList[0];
            num1 = solution;
            num2 = '';
        }
    }
    populateDisplay();
    pointBtn.addEventListener('click', numberPressed);
}

function clearPressed() {
    solution = '0';
    num1 = '';
    num2 = '';
    operator = '';
    populateDisplay();
}

function parseNumber(num) {
    if (num.indexOf('.') !== -1) {
        return parseFloat(num);
    } else {
        return parseInt(num);
    }
}

function add(a, b) {
    return String(Math.round((a + b)*10000)/10000);
}

function subtract(a, b) {
    return String((Math.round((a - b)*10000)/10000).toFixed(4));
}

function multiply(a, b) {
    return String(Math.round((a * b)*10000)/10000);
}

function divide(a, b) {
    return String(Math.round((a / b)*10000)/10000);
}

function operate(a, b) {
    switch (operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
    }
}


/* events */
clrBtn.addEventListener('click', clearPressed);
addBtn.addEventListener('click', operatorPressed);
subBtn.addEventListener('click', operatorPressed);
mulBtn.addEventListener('click', operatorPressed);
divBtn.addEventListener('click', operatorPressed);
equBtn.addEventListener('click', equalsPressed);
pointBtn.addEventListener('click', numberPressed);
zeroBtn.addEventListener('click', numberPressed);
oneBtn.addEventListener('click', numberPressed);
twoBtn.addEventListener('click', numberPressed);
threeBtn.addEventListener('click', numberPressed);
fourBtn.addEventListener('click', numberPressed);
fiveBtn.addEventListener('click', numberPressed);
sixBtn.addEventListener('click', numberPressed);
sevenBtn.addEventListener('click', numberPressed);
eightBtn.addEventListener('click', numberPressed);
nineBtn.addEventListener('click', numberPressed);