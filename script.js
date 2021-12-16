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
    operator = '',
    pointKey = false;


/* functions */
function populateDisplay() {
    display.textContent = solution;
}

function numberPressed(element) {
    if (element.classList[0] === 'point') {
        if (pointKey === true) {
            return;
        }
        pointKey = true;
    }

    if (operator === '') {
        num1 += element.textContent;
        solution = num1;
    } else if (operator === 'equals') {
        num1 = element.textContent;
        solution = num1;
        operator = '';
    } else {
        num2 += element.textContent;
        solution = num2;
    }
    populateDisplay();
}

function operatorPressed(element) {
    if (num1 === '') {
        num1 = '0';
    }
    if (operator === '' || operator === 'equals' || num2 === '') {
        operator = element.classList[0];
        solution += element.textContent;
    } else {
        if (num2 === '0' && operator === 'divide') {
            solution = 'Do not divide numbers by 0.';
            num1 = '';
            num2 = '';
            operator = '';
        } else {
            solution = operate(parseNumber(num1), parseNumber(num2));
            operator = element.classList[0];
            num1 = solution;
            solution += element.textContent;
            num2 = '';
        }
    }
    populateDisplay();
    pointKey = false;
}

function equalsPressed(element) {
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
            operator = element.classList[0];
            num1 = solution;
            num2 = '';
        }
    }
    populateDisplay();
    pointKey = false;
}

function clearPressed() {
    solution = '0';
    num1 = '';
    num2 = '';
    operator = '';
    populateDisplay();
    pointKey = false;
}

function backPressed() {
    if (num2 !== '') {
        if (num2.charAt(num2.length-1) === '.') {
            pointKey = false;
        }
        num2 = num2.slice(0, num2.length-1);
        solution = num2;
    } else if (operator !== '') {
        operator = '';
        solution = solution.slice(0, solution.length-1);
    } else if (num1 !== '') {
        if (num1.charAt(num1.length-1) === '.') {
            pointKey = false;
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

function buttonPressed() {
    if (this.textContent.match(/[0-9.]/)) {
        numberPressed(this);
    } else if (this.textContent.match(/[\+\-\*\/]/)) {
        operatorPressed(this);
    } else if (this.textContent === '=') {
        equalsPressed(this);
    } else if (this.classList[0] === 'clear') {
        clearPressed();
    } else if (this.classList[0] === 'back') {
        backPressed();
    }
}

function keyPressed(e) {
    let keyElement = document.querySelector(`button[data-digit="${e.keyCode}"]`);
    if (!keyElement) {
        keyElement = document.querySelector(`button[data-numpad="${e.keyCode}"]`);
    }
    
    if (keyElement.textContent.match(/[0-9.]/)) {
        numberPressed(keyElement);
    } else if (keyElement.textContent.match(/[\+\-\*\/]/)) {
        operatorPressed(keyElement);
    } else if (keyElement.textContent === '=') {
        equalsPressed(keyElement);
    } else if (keyElement.classList[0] === 'clear') {
        clearPressed();
    } else if (keyElement.classList[0] === 'back') {
        backPressed();
    }
}


/* events */
clrBtn.addEventListener('click', buttonPressed);
backBtn.addEventListener('click', buttonPressed);
addBtn.addEventListener('click', buttonPressed);
subBtn.addEventListener('click', buttonPressed);
mulBtn.addEventListener('click', buttonPressed);
divBtn.addEventListener('click', buttonPressed);
equBtn.addEventListener('click', buttonPressed);
pointBtn.addEventListener('click', buttonPressed);
zeroBtn.addEventListener('click', buttonPressed);
oneBtn.addEventListener('click', buttonPressed);
twoBtn.addEventListener('click', buttonPressed);
threeBtn.addEventListener('click', buttonPressed);
fourBtn.addEventListener('click', buttonPressed);
fiveBtn.addEventListener('click', buttonPressed);
sixBtn.addEventListener('click', buttonPressed);
sevenBtn.addEventListener('click', buttonPressed);
eightBtn.addEventListener('click', buttonPressed);
nineBtn.addEventListener('click', buttonPressed);
window.addEventListener('keydown', keyPressed);