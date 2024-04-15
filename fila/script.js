const fila = [];

function atualizarFila() {
  const listaFila = document.getElementById("fila");
  listaFila.innerHTML = "";
  for (const elemento of fila) {
    const item = document.createElement("li");
    item.textContent = elemento;
    listaFila.appendChild(item);
  }
}

function enfileirar() {
  const elemento = document.getElementById("elemento").value;
  fila.push(elemento);
  atualizarFila();
}

function desenfileirar() {
  if (fila.length > 0) {
    fila.shift();
    atualizarFila();
  } else {
    alert("A fila está vazia!");
  }
}