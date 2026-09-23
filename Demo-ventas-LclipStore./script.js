// Lógica Interactiva LClipStore

// 1. Simulador de Ojo Contador (FOMO)
const contador = document.getElementById('contador-visitas');
if (contador) {
    setInterval(() => {
        const current = parseInt(contador.innerText);
        const change = Math.floor(Math.random() * 11) - 5; // Cambia sutilmente entre -5 y +5
        let next = current + change;
        if (next < 2) next = 2;
        if (next > 200) next = 200;
        contador.innerText = next;
    }, 4000);
}

// 2. Cambio de Color en Tiempo Real
function changeColor(product, imgUrl, element) {
    // Cambiar Imagen con Fundido Suave
    const imgElement = document.getElementById(`img-${product}`);
    if (imgElement) {
        imgElement.style.opacity = 0.3;
        setTimeout(() => {
            imgElement.src = imgUrl;
            imgElement.style.opacity = 1;
        }, 200);
    }
    
    // Actualizar Botón Activo
    const dots = element.parentElement.querySelectorAll('.color-dot');
    dots.forEach(dot => dot.classList.remove('active'));
    element.classList.add('active');
}

// 3. Sistema de Carrito de Compras Extensible
let cart = [];

function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('open');
}

function addToCart(name, price) {
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartDOM();
    
    // Abrir el carrito automáticamente al agregar para mejorar la experiencia
    toggleCart();
}

function updateCartDOM() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const wppBtn = document.getElementById('wpp-checkout-btn');
    
    // Contar total de productos
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.innerText = totalItems;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Tu carrito está vacío.</p>';
        cartTotalPrice.innerText = '\$0';
        wppBtn.href = "#";
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let totalMoney = 0;
    let wppText = "Hola LClipStore! Me interesa encargar los siguientes equipos:\n\n";
    
    cart.forEach(item => {
        totalMoney += item.price * item.quantity;
        wppText += `- ${item.name} (Cantidad: ${item.quantity})\n`;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p style="font-size: 13px; color: #86868b;">$${item.price.toLocaleString('es-AR')} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart('${item.name}')" style="background: none; border: none; color: #ff3b30; cursor: pointer; font-size: 13px;">Quitar</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    wppText += `\nTotal estimado: $${totalMoney.toLocaleString('es-AR')}`;
    cartTotalPrice.innerText = `$${totalMoney.toLocaleString('es-AR')}`;
    wppBtn.href = `https://wa.me{encodeURIComponent(wppText)}`;
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDOM();
}
