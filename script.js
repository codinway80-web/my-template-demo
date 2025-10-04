// Sidebar toggle
function toggleSidebar() {
	document.getElementById('sidebar').classList.toggle('active');
}

// Dropdown menu toggle for mobile nav
function toggleMenu() {
	var navLinks = document.querySelector('.nav-links');
	if (navLinks) {
		navLinks.classList.toggle('show');
	}
}


// --- Dynamic Product Grid ---
const defaultProducts = [
	{ title: 'Wireless Headphones', price: 59.99, img: 'images/head-phones.jpg' },
	{ title: 'Smart Watch', price: 89.99, img: 'images/smartwacth.png' },
	{ title: 'Bluetooth Speaker', price: 39.99, img: 'images/bluetooth-speaker.png' },
	{ title: 'Fitness Tracker', price: 29.99, img: 'images/fitness.png' },
	{ title: 'Gaming Mouse', price: 24.99, img: 'images/gaming-mouse.png' },
	{ title: 'Laptop Stand', price: 34.99, img: 'images/laptop-stand.png' },
	{ title: 'USB-C Hub', price: 19.99, img: 'images/USBc.png' },
	{ title: 'Portable SSD', price: 79.99, img: 'images/1756627120530.Screenshot_20250831-070046.png' },
	{ title: 'Noise Cancelling Earbuds', price: 49.99, img: 'images/earbuds.png' },
	{ title: 'Smart Lamp', price: 27.99, img: 'images/lamp.png' }
];

function getProducts() {
	const stored = localStorage.getItem('products');
	if (stored) {
		try {
			const arr = JSON.parse(stored);
			if (Array.isArray(arr) && arr.length > 0) return arr;
		} catch {}
	}
	return defaultProducts;
}

function renderProductGrid() {
	const grid = document.querySelector('.products-grid');
	if (!grid) return;
	grid.innerHTML = '';
	getProducts().forEach((prod, i) => {
		const card = document.createElement('div');
		card.className = 'product-card';
		card.setAttribute('data-title', prod.title);
		card.innerHTML = `
			<a href="product.html"><img src="${prod.img}" alt="${prod.title}"></a>
			<h3>${prod.title}</h3>
			<p class="price">$${prod.price.toFixed(2)}</p>
			<button class="add-to-cart">Add to Cart</button>
		`;
		card.style.animationDelay = (0.1 + i * 0.1) + 's';
		grid.appendChild(card);
	});
}

window.addEventListener('DOMContentLoaded', () => {
	renderProductGrid();
	// Re-attach add-to-cart events after rendering
	document.querySelectorAll('.product-card .add-to-cart').forEach(btn => {
		btn.addEventListener('click', function() {
			const card = btn.closest('.product-card');
			const title = card.getAttribute('data-title');
			const price = parseFloat(card.querySelector('.price').textContent.replace(/[^\d.]/g, ''));
			const img = card.querySelector('img').getAttribute('src');
			addToCart({ title, price, img });
			btn.textContent = 'Added!';
			btn.disabled = true;
			btn.classList.add('added');
			setTimeout(() => {
				btn.textContent = 'Add to Cart';
				btn.disabled = false;
				btn.classList.remove('added');
			}, 1200);
		});
	});
	// Card animation
	document.querySelectorAll('.product-card').forEach((card, i) => {
		card.style.animationDelay = (0.1 + i * 0.1) + 's';
	});
	updateCartCount();
});

// --- Real Cart System ---
function getCart() {
	return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
	localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount() {
	const cart = getCart();
	const count = cart.reduce((sum, item) => sum + item.qty, 0);
	document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}
function addToCart(product) {
	let cart = getCart();
	const idx = cart.findIndex(item => item.title === product.title);
	if (idx > -1) {
		cart[idx].qty += 1;
	} else {
		cart.push({ ...product, qty: 1 });
	}
	setCart(cart);
	updateCartCount();
}

// Attach add-to-cart events
document.querySelectorAll('.add-to-cart').forEach(btn => {
	btn.addEventListener('click', function() {
		const card = btn.closest('.product-card');
		const title = card.getAttribute('data-title');
		const price = parseFloat(card.querySelector('.price').textContent.replace(/[^\d.]/g, ''));
		const img = card.querySelector('img').getAttribute('src');
		addToCart({ title, price, img });
		btn.textContent = 'Added!';
		btn.disabled = true;
		btn.classList.add('added');
		setTimeout(() => {
			btn.textContent = 'Add to Cart';
			btn.disabled = false;
			btn.classList.remove('added');
		}, 1200);
	});
});

// Search filter for products
const searchInput = document.getElementById('searchInput');
if (searchInput) {
	searchInput.addEventListener('input', function() {
		const val = this.value.toLowerCase();
		document.querySelectorAll('.product-card').forEach(card => {
			const title = card.getAttribute('data-title').toLowerCase();
			card.style.display = title.includes(val) ? '' : 'none';
		});
	});
}
