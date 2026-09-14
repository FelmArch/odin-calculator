
function adicionar(a, b) {
    return a + b;
}

function subtrair(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    return a / b;
}

function operate(operador, a, b) {
    // Primeiro, verificamos: o operador é "+"?
    if (operador === "+") {
        return adicionar(a, b);

    // Se não é "+", será que é "-"?
    } else if (operador === "-") {
        return subtrair(a, b);

    // Se não é "-", será que é "*"?
    } else if (operador === "*") {
        return multiplicar(a, b);

    // Se não é "*", será que é "/"?
    } else if (operador === "/") {
        return dividir(a, b);
    }
}
