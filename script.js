let primeiroNumero = "";
let operador = "";
let segundoNumero = "";
let contaFinalizada = false;

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
    if (b === 0) {
        return "Nem tenta! 😂";
    }
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
        contaFinalizada = false;
        return;
    }

    if (!isNaN(valor)) {
        if (contaFinalizada || expressao.textContent === "Nem tenta! 😂") {
            expressao.textContent = "";
            primeiroNumero = "";
            operador = "";
            segundoNumero = "";
            contaFinalizada = false;
        }

        if (operador) {
            segundoNumero += valor;
            expressao.textContent += valor;

            if (operador === "/" && Number(segundoNumero) === 0) {
                resultado.textContent = "";
            } else {
                resultado.textContent = operate(operador, Number(primeiroNumero), Number(segundoNumero));
            }
        } else {
            primeiroNumero += valor;
            expressao.textContent += valor;
        }
    }

    if (["+", "-", "*", "/"].includes(valor)) {
        if (expressao.textContent === "Nem tenta! 😂") return;

        contaFinalizada = false;

        if (primeiroNumero) {
            if (operador && segundoNumero) {
                const conta = operate(operador, Number(primeiroNumero), Number(segundoNumero));

                if (typeof conta === "string") {
                    expressao.textContent = conta;
                    resultado.textContent = "";
                    primeiroNumero = "";
                    operador = "";
                    segundoNumero = "";
                    return;
                }
                primeiroNumero = String(conta);
                segundoNumero = "";
            }
            operador = valor;
            expressao.textContent += " " + valor + " ";
            resultado.textContent = "";
        }
    }

    if (valor === "=") {
        if (primeiroNumero && operador && segundoNumero) {
            const conta = operate(operador, Number(primeiroNumero), Number(segundoNumero));
            expressao.textContent = conta;
            resultado.textContent = "";

            if (conta === "Nem tenta! 😂") {
                primeiroNumero = "";
            } else {
                primeiroNumero = String(conta);
            }
            operador = "";
            segundoNumero = "";
            contaFinalizada = true;
        }
    }
});
