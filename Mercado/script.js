// Data Storage (Simulating database with localStorage for simplicity)
const products = JSON.parse(localStorage.getItem('products')) || [];
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render functions
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    console.log('Products to render:', products); // Log the products to render
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(productDiv);
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
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>Quantidade: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.productId})">Remover</button>
        `;
        cartItems.appendChild(cartItemDiv);
    });
    document.getElementById('cart-total').innerText = `R$ ${total.toFixed(2)}`;
}

// Cart functions
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

function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex(item => item.productId === productId);
    if (cartItemIndex > -1) {
        cart.splice(cartItemIndex, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Admin functions
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'admin') {
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        renderAdminProducts();
    } else {
        alert('Usuário ou senha incorretos');
    }
}

function saveProduct(event) {
    event.preventDefault();
    const id = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const description = document.getElementById('product-description').value;
    const image = document.getElementById('product-image').value;

    if (id) {
        // Edit existing product
        const product = products.find(p => p.id === parseInt(id));
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
    } else {
        // Add new product
        products.push({ id: products.length + 1, name, price, description, image });
    }

    localStorage.setItem('products', JSON.stringify(products));
    console.log('Products saved to localStorage:', products); // Log the products
    renderAdminProducts();
    renderProducts(); // Ensure the product list is updated on the main page
}

function renderAdminProducts() {
    const adminProductList = document.getElementById('admin-product-list');
    adminProductList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('admin-product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button onclick="editProduct(${product.id})">Editar</button>
            <button onclick="deleteProduct(${product.id})">Remover</button>
        `;
        adminProductList.appendChild(productDiv);
    });
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-image').value = product.image;
}

function deleteProduct(productId) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        products.splice(productIndex, 1);
    }
    localStorage.setItem('products', JSON.stringify(products));
    renderAdminProducts();
    renderProducts();
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }

    // For simplicity, we'll just clear the cart and show an alert
    alert('Compra realizada com sucesso!');
    localStorage.removeItem('cart');
    renderCart();
}

// Event listeners
document.getElementById('login-form').addEventListener('submit', login);
document.getElementById('product-form').addEventListener('submit', saveProduct);
document.getElementById('checkout-button').addEventListener('click', checkout);

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
});
