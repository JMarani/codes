function adicionarItem() {
    var item = prompt("Digite o nome do item:");
    var lista = document.getElementById("lista");
    var novoItem = document.createElement("li");
    novoItem.innerText = item;
    lista.appendChild(novoItem);
  }
  
  function removerItem() {
    var lista = document.getElementById("lista");
    var ultimoItem = lista.lastElementChild;
    if (ultimoItem) {
      lista.removeChild(ultimoItem);
    } else {
      alert("A lista está vazia!");
    }
  }