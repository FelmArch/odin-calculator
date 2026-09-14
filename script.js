
let primeiroNumero = "";
let operador = "";
let segundoNumero = "";

const display = document.querySelector("#display");
const buttons = document.querySelector(".buttons");


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

buttons.addEventListener("click", function (e) {
    const valor = e.target.dataset.valor;

    if (!isNaN(valor)) {
        if (display.textContent === "0") {
            display.textContent = valor;
        } else {
            display.textContent += valor;
        }
    }
});

