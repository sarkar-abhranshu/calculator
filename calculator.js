const add = (a, b) => {
    return a+b;
}
const subtract = (a, b) => {
    return a-b;
}
const multiply = (a, b) => {
    return a*b;
}
const divide = (a, b) => {
    return a/b;
}

const operate = (a, b, operation) => {
    switch(operation) {
        case '+':
            result = add(a, b);
        case '-':
            result = subtract(a, b);
        case '*':
            result = multiply(a, b);
        case '/':
            result = divide(a, b);
    }
    return result;
}

let op1, op2, operation, result;