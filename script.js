/* initialize */
const display = document.querySelector('.display'),
    clrBtn = document.querySelector('.clear'),
    backBtn = document.querySelector('.back'),
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
        solution += this.textContent;
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
            solution += this.textContent;
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
    pointBtn.addEventListener('click', numberPressed);
}

function backPressed() {
    if (num2 !== '') {
        if (num2.charAt(num2.length-1) === '.') {
            pointBtn.addEventListener('click', numberPressed);
        }
        num2 = num2.slice(0, num2.length-1);
        solution = num2;
    } else if (operator !== '') {
        operator = '';
        solution = solution.slice(0, solution.length-1);
    } else if (num1 !== '') {
        if (num1.charAt(num1.length-1) === '.') {
            pointBtn.addEventListener('click', numberPressed);
        }
        num1 = num1.slice(0, num1.length-1);
        solution = num1;
    }

    if (solution === '') {
        solution = '0';
    }
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
    let result = Math.round((a - b)*10000)/10000;
    if (!Number.isInteger(result)) {
        result.toFixed(4);
    }
    return String(result);
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
backBtn.addEventListener('click', backPressed);
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