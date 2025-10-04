
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
    const cart = getCart();
    const cartItemsDiv = document.querySelector('.cart-items');
    cartItemsDiv.innerHTML = '';
    let subtotal = 0;
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    }
    cart.forEach((item, idx) => {
        subtotal += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
                <h3>${item.title || item.name}</h3>
                <label>Qty: <input type="number" min="1" value="${item.qty}" data-idx="${idx}" class="qty-input"></label>
                <p>Price: $${item.price.toFixed(2)}</p>
                <button class="remove-btn" data-idx="${idx}">Remove</button>
            </div>
        `;
        cartItemsDiv.appendChild(div);
    });
    document.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
    const shipping = subtotal > 0 ? 5.00 : 0.00;
    document.querySelector('.shipping').textContent = `$${shipping.toFixed(2)}`;
    document.querySelector('.total').textContent = `$${(subtotal + shipping).toFixed(2)}`;

    // Quantity change
    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', function() {
            let val = parseInt(this.value);
            if (isNaN(val) || val < 1) val = 1;
            const idx = parseInt(this.getAttribute('data-idx'));
            const cart = getCart();
            cart[idx].qty = val;
            setCart(cart);
            renderCart();
        });
    });
    // Remove item
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-idx'));
            const cart = getCart();
            cart.splice(idx, 1);
            setCart(cart);
            renderCart();
        });
    });
    // Update cart count in header
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

document.addEventListener('DOMContentLoaded', renderCart);


// Order confirmation modal
function showOrderConfirmation() {
    let modal = document.createElement('div');
    modal.className = 'order-modal';
    modal.innerHTML = `
        <div class="order-modal-content">
            <h2>Thank you for your order!</h2>
            <p>Your order has been placed successfully.</p>
            <button class="btn-primary" id="closeOrderModal">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('closeOrderModal').onclick = function() {
        modal.remove();
    };
}

document.getElementById('place-order').addEventListener('click', function() {
    localStorage.removeItem('cart');
    renderCart();
    showOrderConfirmation();
});

// Order modal styles
const style = document.createElement('style');
style.textContent = `
.order-modal {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}
.order-modal-content {
    background: #fff;
    border-radius: 12px;
    padding: 2rem 2.5rem;
    box-shadow: 0 2px 16px #0002;
    text-align: center;
}
.order-modal-content h2 {
    color: #3a1c71;
    margin-bottom: 1rem;
}
.order-modal-content button {
    margin-top: 1.5rem;
}
`;
document.head.appendChild(style);
