const products = JSON.parse(localStorage.getItem('products')) || [];
const cart = JSON.parse(localStorage.getItem('cart')) || [];

const adminUsername = 'admin';
const adminPassword = 'admin'; 

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === adminUsername && password === adminPassword) {
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        renderAdminProducts();  
    } else {
        alert('Nome de usuário ou senha incorretos!');
    }
});

document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const product = {
        id: Date.now(),
        name: document.getElementById('product-name').value,
        price: parseFloat(document.getElementById('product-price').value),
        description: document.getElementById('product-description').value,
        image: document.getElementById('product-image').value
    };
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    console.log('Products after save:', JSON.parse(localStorage.getItem('products'))); 
    alert('Produto salvo com sucesso!');
    this.reset();
    renderAdminProducts(); 
});
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='placeholder.png';">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(productDiv);
    });
}

function renderAdminProducts() {
    const adminProductList = document.getElementById('admin-product-list');
    adminProductList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='placeholder.png';">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>R$ ${product.price.toFixed(2)}</p>
        `;
        adminProductList.appendChild(productDiv);
    });
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        total += product.price * item.quantity;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='placeholder.png';">
            <h4>${product.name}</h4>
            <p>Quantidade: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.productId})">Remover</button>
        `;
        cartItems.appendChild(cartItemDiv);
    });
    document.getElementById('cart-total').innerText = `R$ ${total.toFixed(2)}`;
}

function addToCart(productId) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
});
