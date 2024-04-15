function adicionarItem() {
    var item = prompt("Digite o nome do item:");
    var lista = document.getElementById("lista");
    var novoItem = document.createElement("li");
    novoItem.innerText = item;
    lista.appendChild(novoItem);
  }