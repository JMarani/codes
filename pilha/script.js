let pilha = [];

function atualizarPilha() {
  let pilhaDiv = document.getElementById("pilha");
  pilhaDiv.innerHTML = "";
  for (let i = pilha.length - 1; i >= 0; i--) {
    let itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.textContent = pilha[i];
    pilhaDiv.appendChild(itemDiv);
  }
}

function empilhar() {
  let valor = document.getElementById("valor").value;
  if (valor) {
    pilha.push(valor);
    atualizarPilha();
    document.getElementById("valor").value = "";
  }
}

function desempilhar() {
  if (pilha.length > 0) {
    pilha.pop();
    atualizarPilha();
  }
}