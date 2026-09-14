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
    let resultadoOperacao;
    if (operador === "+") {
        resultadoOperacao = adicionar(a, b);
    } else if (operador === "-") {
        resultadoOperacao = subtrair(a, b);
    } else if (operador === "*") {
        resultadoOperacao = multiplicar(a, b);
    } else if (operador === "/") {
        resultadoOperacao = dividir(a, b);
    }

    if (typeof resultadoOperacao === "string") {
        return resultadoOperacao;
    }

    return Math.round(resultadoOperacao * 1000) / 1000;
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

    if (valor === "←") {
        if (contaFinalizada || expressao.textContent === "Nem tenta! 😂") {
            expressao.textContent = "";
            resultado.textContent = "";
            primeiroNumero = "";
            operador = "";
            segundoNumero = "";
            contaFinalizada = false;
            return;
        }

        if (segundoNumero) {
            segundoNumero = segundoNumero.slice(0, -1);
            expressao.textContent = expressao.textContent.slice(0, -1);

            if (segundoNumero && !(operador === "/" && Number(segundoNumero) === 0)) {
                resultado.textContent = operate(operador, Number(primeiroNumero), Number(segundoNumero));
            } else {
                resultado.textContent = "";
            }
            return;
        }

        if (operador) {
            operador = "";
            expressao.textContent = expressao.textContent.trimEnd().slice(0, -1).trimEnd();
            resultado.textContent = "";
            return;
        }

        if (primeiroNumero) {
            primeiroNumero = primeiroNumero.slice(0, -1);
            expressao.textContent = expressao.textContent.slice(0, -1);
            return;
        }
    }

    if (valor === ".") {
        if (contaFinalizada || expressao.textContent === "Nem tenta! 😂") {
            expressao.textContent = "0.";
            primeiroNumero = "0.";
            operador = "";
            segundoNumero = "";
            contaFinalizada = false;
            return;
        }

        if (operador) {
            if (segundoNumero.includes(".")) return;

            if (!segundoNumero) {
                segundoNumero = "0.";
                expressao.textContent += "0.";
            } else {
                segundoNumero += ".";
                expressao.textContent += ".";
            }
        } else {
            if (primeiroNumero.includes(".")) return;

            if (!primeiroNumero) {
                primeiroNumero = "0.";
                expressao.textContent = "0.";
            } else {
                primeiroNumero += ".";
                expressao.textContent += ".";
            }
        }
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
            if (operador && !segundoNumero) {
                operador = valor;
                expressao.textContent = expressao.textContent.trimEnd().slice(0, -1) + valor + " ";
                return;
            }

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
