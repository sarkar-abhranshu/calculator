const displayP = document.createElement('p');
const display = document.getElementById('display');
display.appendChild(displayP);
const nums = document.querySelectorAll('.nums');
const ops = document.querySelectorAll('.ops');
let op1, op2, operation, result;

const add = (a, b) => {
    return a + b;
}
const subtract = (a, b) => {
    return a - b;
}
const multiply = (a, b) => {
    return a * b;
}
const divide = (a, b) => {
    return a / b;
}

const operate = (a, b, operation) => {
    switch (operation) {
        case '+':
            result = Math.round(add(a, b) * 1000)/1000;
            break;
        case '-':
            result = Math.round(subtract(a, b) * 1000)/1000;
            break;
        case '*':
            result = Math.round(multiply(a, b) * 1000)/1000;
            break;
        case '/':
            result = Math.round(divide(a, b) * 1000)/1000;
            break;
    }
    return result;
}

let isFirstOperand = true;
let isResultDisplayed = false;
let numberPressed = false;

const setOperands = (num) => {
    numberPressed = true;
    if (isResultDisplayed) {
        displayP.textContent = num;
        op1 = parseFloat(num);
        op2 = undefined;
        operation = undefined;
        isFirstOperand = false;
        isResultDisplayed = false;
    } else if (isFirstOperand) {
        op1 = parseFloat((op1 || '') + num);
        displayP.textContent = op1;
    } else {
        op2 = parseFloat((op2 || '') + num);
        displayP.textContent += num;
    }
};

nums.forEach(num => {
    num.addEventListener('click', (e) => {
        setOperands(e.target.textContent);
    });
});

ops.forEach(op => {
    op.addEventListener('click', (e) => {
        const opText = e.target.textContent;
        if (opText !== 'AC' && !numberPressed) {
            return;
        }
        if (opText === '=') {
            if (op1 !== undefined && op2 !== undefined && operation) {
                result = operate(op1, op2, operation);
                displayP.textContent = result;
                isResultDisplayed = true;
                isFirstOperand = true;
                numberPressed = false;
            }
        } else if (opText === 'AC') {
            displayP.textContent = '';
            op1 = op2 = result = undefined;
            operation = undefined;
            isFirstOperand = true;
            isResultDisplayed = false;
            numberPressed = false;
        } else {
            if (!operation) {
                operation = opText;
                displayP.textContent += ` ${operation} `;
                isFirstOperand = false;
                numberPressed = false;
            }
        }
    });
});