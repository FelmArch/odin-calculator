let contaFinalizada = false;

const expressao = document.querySelector("#expressao");
const resultado = document.querySelector("#resultado");
const buttons = document.querySelector(".buttons");

// Manter o cursor focado no início
expressao.focus();

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

    return Math.round(resultadoOperacao * 10000) / 10000;
}

// Avaliador de expressões personalizado (sem eval!)
function calcularExpressao(texto) {
    texto = texto.trim();
    if (!texto) return "";

    const tokens = texto.match(/(\d+\.?\d*|[+\-*/])/g);
    if (!tokens) return "";

    let total = Number(tokens[0]);
    if (isNaN(total)) return "";

    for (let i = 1; i < tokens.length; i += 2) {
        const op = tokens[i];
        const proximoStr = tokens[i + 1];
        if (proximoStr === undefined) break;

        const proximo = Number(proximoStr);
        if (isNaN(proximo)) break;

        const res = operate(op, total, proximo);
        if (typeof res === "string") {
            return res;
        }
        total = res;
    }

    return total;
}

function atualizarPreview() {
    const texto = expressao.value.trim();

    if (!texto || /[+\-*/]$/.test(texto)) {
        resultado.textContent = "";
        return;
    }

    if (!/[+\-*/]/.test(texto)) {
        resultado.textContent = "";
        return;
    }

    // Se for divisão por zero não finalizada (ex: 10 / 0), aguarda
    if (/\/ 0$/.test(texto)) {
        resultado.textContent = "";
        return;
    }

    const calc = calcularExpressao(texto);
    if (typeof calc === "number") {
        resultado.textContent = calc;
    } else {
        resultado.textContent = "";
    }
}

// Inserir na posição exata do cursor
function inserirTexto(novoTexto) {
    expressao.focus();
    const pos = expressao.selectionStart ?? expressao.value.length;
    const antes = expressao.value.slice(0, pos);
    const depois = expressao.value.slice(pos);

    expressao.value = antes + novoTexto + depois;
    const novaPos = pos + novoTexto.length;
    expressao.setSelectionRange(novaPos, novaPos);
    atualizarPreview();
}

function apagarNoCursor() {
    expressao.focus();
    let pos = expressao.selectionStart ?? expressao.value.length;
    if (pos === 0) return;

    let antes = expressao.value.slice(0, pos);
    let depois = expressao.value.slice(pos);

    // Se antes do cursor for operador com espaço, apaga o bloco do operador
    if (antes.endsWith(" ")) {
        antes = antes.trimEnd();
        antes = antes.slice(0, -1).trimEnd();
    } else {
        antes = antes.slice(0, -1);
    }

    expressao.value = antes + depois;
    const novaPos = antes.length;
    expressao.setSelectionRange(novaPos, novaPos);
    atualizarPreview();
}

function inserirOperador(op) {
    expressao.focus();
    const pos = expressao.selectionStart ?? expressao.value.length;
    let texto = expressao.value;

    if (!texto || texto === "Nem tenta! 😂") return;

    if (pos === texto.length && /[+\-*/]\s*$/.test(texto)) {
        texto = texto.trimEnd().slice(0, -1) + op + " ";
        expressao.value = texto;
        expressao.setSelectionRange(texto.length, texto.length);
        atualizarPreview();
        return;
    }

    inserirTexto(" " + op + " ");
}

function inserirDecimal() {
    expressao.focus();
    const pos = expressao.selectionStart ?? expressao.value.length;
    const texto = expressao.value;

    if (contaFinalizada || texto === "Nem tenta! 😂") {
        expressao.value = "0.";
        contaFinalizada = false;
        expressao.setSelectionRange(2, 2);
        atualizarPreview();
        return;
    }

    const antes = texto.slice(0, pos);
    const pedacoAtual = antes.split(/[\s+\-*/]/).pop();

    if (pedacoAtual.includes(".")) return;

    if (!pedacoAtual) {
        inserirTexto("0.");
    } else {
        inserirTexto(".");
    }
}

function calcularFinal() {
    const texto = expressao.value.trim();
    if (!texto || !/[+\-*/]/.test(texto)) return;

    const calc = calcularExpressao(texto);
    expressao.value = calc;
    resultado.textContent = "";
    contaFinalizada = true;
    expressao.setSelectionRange(String(calc).length, String(calc).length);
}

// Atualizar caso digite diretamente no input
expressao.addEventListener("input", atualizarPreview);

buttons.addEventListener("click", function (e) {
    const valor = e.target.dataset.valor;
    if (!valor) return;

    if (valor === "C") {
        expressao.value = "";
        resultado.textContent = "";
        contaFinalizada = false;
        expressao.focus();
        return;
    }

    if (valor === "←") {
        if (contaFinalizada || expressao.value === "Nem tenta! 😂") {
            expressao.value = "";
            resultado.textContent = "";
            contaFinalizada = false;
            expressao.focus();
            return;
        }
        apagarNoCursor();
        return;
    }

    if (valor === ".") {
        inserirDecimal();
        return;
    }

    if (!isNaN(valor)) {
        if (contaFinalizada || expressao.value === "Nem tenta! 😂") {
            expressao.value = "";
            contaFinalizada = false;
        }
        inserirTexto(valor);
        return;
    }

    if (["+", "-", "*", "/"].includes(valor)) {
        contaFinalizada = false;
        inserirOperador(valor);
        return;
    }

    if (valor === "=") {
        calcularFinal();
    }
});

window.addEventListener("keydown", function (e) {
    let valor = e.key;

    if (valor === "Enter") {
        e.preventDefault();
        valor = "=";
    } else if (valor === ",") {
        valor = ".";
    } else if (valor === "Backspace") {
        valor = "←";
    } else if (valor === "Escape" || valor.toLowerCase() === "c") {
        valor = "C";
    }

    const botao = document.querySelector(`button[data-valor="${valor}"]`);
    if (botao) {
        botao.click();
    }
});
