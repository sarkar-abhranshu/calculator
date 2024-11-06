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
            if(b === 0){
                displayP.textContent = 'Cannot divide by zero';
                op1 = op2 = undefined;
                operation = undefined;
                isFirstOperand = true;
                isResultDisplayed = true;
                numberPressed = false;
                return null;
            }
            result = Math.round(divide(a, b) * 1000)/1000;
            break;
    }
    return result;
}

let isFirstOperand = true;
let isResultDisplayed = false;
let numberPressed = false;
let isDecimal = false;

const setOperands = (num) => {
    numberPressed = true;
    if (isResultDisplayed) {
        displayP.textContent = num;
        op1 = num;
        op2 = undefined;
        operation = undefined;
        isFirstOperand = false;
        isResultDisplayed = false;
        isDecimal = false;
    } else if (isFirstOperand) {
        if (op1 === undefined) op1 = '';
        op1 = op1 + num;
        displayP.textContent = op1;
    } else {
        if (op2 === undefined) op2 = '';
        op2 = op2 + num;
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
        if (opText !== 'AC' && !numberPressed && opText !== '.' && opText !== ' <- ') {
            return;
        }
        if (opText === '=') {
            if (op1 !== undefined && op2 !== undefined && operation) {
                op1 = parseFloat(op1);
                op2 = parseFloat(op2);
                result = operate(op1, op2, operation);
                if (result !== null) {
                    displayP.textContent = result;
                    isResultDisplayed = true;
                    isFirstOperand = true;
                    numberPressed = false;
                    isDecimal = false;
                }
            }
        } 
        else if (opText === 'AC') {
            displayP.textContent = '';
            op1 = op2 = result = undefined;
            operation = undefined;
            isFirstOperand = true;
            isResultDisplayed = false;
            numberPressed = false;
            isDecimal = false;
        }
        else if(opText === '.') {
            if (isFirstOperand && (!op1 || !op1.includes('.'))) {
                if (!op1) op1 = '0';
                op1 += '.';
                displayP.textContent = op1;
                numberPressed = true;
            } else if (!isFirstOperand && (!op2 || !op2.includes('.'))) {
                if (!op2) op2 = '0';
                op2 += '.';
                displayP.textContent += '.';
                numberPressed = true;
            }
        }
        else if(opText === ' <- ') {
            if (isResultDisplayed) return;
            
            let displayText = displayP.textContent;
            if (displayText.length === 0) return;

            if (displayText.endsWith(' ')) {
                displayText = displayText.slice(0, -3);
                operation = undefined;
                isFirstOperand = true;
            } else {
                displayText = displayText.slice(0, -1);
                if (isFirstOperand) {
                    op1 = op1.slice(0, -1);
                    if (op1 === '') op1 = undefined;
                } else {
                    op2 = op2?.slice(0, -1);
                    if (op2 === '') op2 = undefined;
                }
            }

            displayP.textContent = displayText;
            if (displayText === '') {
                op1 = op2 = undefined;
                operation = undefined;
                isFirstOperand = true;
                numberPressed = false;
                isDecimal = false;
            }
        }
        else {
            if (!operation) {
                operation = opText;
                displayP.textContent += ` ${operation} `;
                isFirstOperand = false;
                numberPressed = false;
                isDecimal = false;
            }
        }
    });
});