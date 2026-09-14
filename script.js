let primeiroNumero = "";
let operador = "";
let segundoNumero = "";

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
    if (operador === "+") {
        return adicionar(a, b);
    } else if (operador === "-") {
        return subtrair(a, b);
    } else if (operador === "*") {
        return multiplicar(a, b);
    } else if (operador === "/") {
        return dividir(a, b);
    }
}

buttons.addEventListener("click", function (e) {
    const valor = e.target.dataset.valor;
    if (!valor) return;

    if (valor === "C") {
        expressao.textContent = "";
        resultado.textContent = "";
        primeiroNumero = "";
        operador = "";
        segundoNumero = "";
        return;
    }

    if (!isNaN(valor)) {
        if (operador) {
            segundoNumero += valor;
            expressao.textContent = primeiroNumero + " " + operador + " " + segundoNumero;
            resultado.textContent = operate(operador, Number(primeiroNumero), Number(segundoNumero));
        } else {
            primeiroNumero += valor;
            expressao.textContent = primeiroNumero;
        }
    }

    if (["+", "-", "*", "/"].includes(valor)) {
        if (primeiroNumero) {
            operador = valor;
            expressao.textContent = primeiroNumero + " " + operador;
        }
    }

    if (valor === "=") {
        if (primeiroNumero && operador && segundoNumero) {
            const conta = operate(operador, Number(primeiroNumero), Number(segundoNumero));
            expressao.textContent = conta;
            resultado.textContent = "";
            primeiroNumero = String(conta);
            operador = "";
            segundoNumero = "";
        }
    }
});
