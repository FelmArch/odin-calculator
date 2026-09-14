
let primeiroNumero = "";
let operador = "";
let segundoNumero = "";
let deveResetDisplay = false;

const expressao = document.querySelector("#expressao");
const resultado = document.querySelector("#resultado");
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
    if (!valor) return;

    if (valor === "C") {
        resultado.textContent = "0";
        expressao.textContent = "";
        primeiroNumero = "";
        operador = "";
        segundoNumero = "";
        return;
    }

    if (!isNaN(valor)) {
        if (resultado.textContent === "0" || deveResetDisplay) {
            resultado.textContent = valor;
            deveResetDisplay = false;
        } else {
            resultado.textContent += valor;
        }
            expressao.textContent += valor;
    }

    if (["+", "-", "*", "/"].includes(valor)) {
        primeiroNumero = resultado.textContent;
        operador = valor;
        deveResetDisplay = true;
        expressao.textContent += " " + valor + " ";
    }
});



