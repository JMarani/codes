// Função para sincronizar produtos entre páginas
function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function loadProductsFromLocalStorage() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    }
}

// Dados de exemplo dos produtos
let products = [
    { id: 1, name: "Produto 1", price: 79.90, description: "Descrição do Produto 1" },
    { id: 2, name: "Produto 2", price: 39.90, description: "Descrição do Produto 2" },
    { id: 3, name: "Produto 3", price: 59.90, description: "Descrição do Produto 3" }
];

let cart = [];
let editingProductId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadProductsFromLocalStorage();
    loadProducts();
    loadCart();
    setupCheckoutModal();
    setupAdmin();
    setupCartModal();
});

function loadProducts() {
    const productsDiv = document.getElementById('produtos');
    if (productsDiv) {
        productsDiv.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('produto');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            `;
            productsDiv.appendChild(productDiv);
        });
    }
}

function loadCart() {
    const cartItemsDiv = document.getElementById('itens-carrinho');
    if (cartItemsDiv) {
        cartItemsDiv.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('item-carrinho');
            cartItemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                <p class="quantidade">Quantidade: ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remover</button>
            `;
            cartItemsDiv.appendChild(cartItemDiv);
            total += item.price * item.quantity;
        });
        document.getElementById('total-carrinho').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    loadCart();
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    loadCart();
}

function setupCheckoutModal() {
    const modal = document.getElementById('modal-finalizar');
    if (modal) {
        const span = document.getElementsByClassName('fechar')[1];

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        document.getElementById('form-finalizar').addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Compra finalizada com sucesso!');
            modal.style.display = "none";
            cart = [];
            loadCart();
        });
    }
}

function setupCartModal() {
    const modal = document.getElementById('modal-carrinho');
    const btn = document.getElementById('botao-carrinho');
    const span = document.getElementsByClassName('fechar')[0];
    const checkoutBtn = document.getElementById('botao-finalizar-compra');

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    checkoutBtn.onclick = function() {
        modal.style.display = "none";
        document.getElementById('modal-finalizar').style.display = "block";
    }
}

function login() {
    const username = document.getElementById('usuario').value;
    const password = document.getElementById('senha').value;

    if (username === 'admin' && password === 'admin') {
        document.getElementById('form-login').style.display = 'none';
        document.getElementById('painel-admin').style.display = 'block';
        loadAdminProducts();
    } else {
        alert('Usuário ou senha incorretos!');
    }
}

function loadAdminProducts() {
    const adminProductsDiv = document.getElementById('admin-produtos');
    if (adminProductsDiv) {
        adminProductsDiv.innerHTML = '';
        products.forEach(product => {
            const adminProductDiv = document.createElement('div');
            adminProductDiv.classList.add('admin-produto');
            adminProductDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <p>${product.description}</p>
                <button onclick="editProduct(${product.id})">Editar</button>
                <button onclick="deleteProduct(${product.id})">Remover</button>
            `;
            adminProductsDiv.appendChild(adminProductDiv);
        });
    }
}

document.getElementById('form-produto').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = editingProductId ? editingProductId : products.length + 1;
    const name = document.getElementById('nome-produto').value;
    const price = parseFloat(document.getElementById('preco-produto').value.replace(',', '.'));
    const description = document.getElementById('descricao-produto').value;

    if (editingProductId) {
        const index = products.findIndex(p => p.id === editingProductId);
        products[index] = { id, name, price, description };
        editingProductId = null;
    } else {
        const newProduct = { id, name, price, description };
        products.push(newProduct);
    }

    saveProductsToLocalStorage();
    loadProducts();
    loadAdminProducts();
    document.getElementById('form-produto').reset();
});

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    document.getElementById('id-produto').value = product.id;
    document.getElementById('nome-produto').value = product.name;
    document.getElementById('preco-produto').value = product.price.toFixed(2).replace('.', ',');
    document.getElementById('descricao-produto').value = product.description;
    editingProductId = productId;
}

function deleteProduct(productId) {
    products = products.filter(p => p.id !== productId);
    saveProductsToLocalStorage();
    loadProducts();
    loadAdminProducts();
}

function setupAdmin() {
    if (document.getElementById('admin-produtos')) {
        loadAdminProducts();
    }
}
