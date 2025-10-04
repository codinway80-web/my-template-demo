// Simple admin authentication (demo only)
if (!localStorage.getItem('isAdmin')) {
    window.location.href = 'login.html';
}

document.getElementById('logoutBtn').onclick = function() {
    localStorage.removeItem('isAdmin');
    window.location.href = 'login.html';
};

// Product management
const productForm = document.getElementById('productForm');
const adminProductList = document.getElementById('adminProductList');

function getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
}
function setProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}
function addProduct(product) {
    const products = getProducts();
    products.push(product);
    setProducts(products);
}
function deleteProduct(idx) {
    const products = getProducts();
    products.splice(idx, 1);
    setProducts(products);
}

function renderProducts() {
    const products = getProducts();
    adminProductList.innerHTML = '';
    if (products.length === 0) {
        adminProductList.innerHTML = '<p>No products yet.</p>';
        return;
    }
    products.forEach((prod, idx) => {
        const div = document.createElement('div');
        div.className = 'admin-product-item';
        div.innerHTML = `
            <img src="${prod.img}" alt="${prod.title}" style="width:60px;height:60px;border-radius:6px;vertical-align:middle;"> 
            <strong>${prod.title}</strong> - $${prod.price.toFixed(2)}
            <button data-idx="${idx}" class="delete-btn">Delete</button>
        `;
        adminProductList.appendChild(div);
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = function() {
            const idx = parseInt(btn.getAttribute('data-idx'));
            deleteProduct(idx);
            renderProducts();
        };
    });
}

productForm.onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById('prodTitle').value.trim();
    const price = parseFloat(document.getElementById('prodPrice').value);
    const img = document.getElementById('prodImg').value.trim();
    if (!title || isNaN(price) || !img) return;
    addProduct({ title, price, img });
    renderProducts();
    productForm.reset();
};

// Expose for testing
window.__adminTest = {
    getProducts,
    setProducts,
    addProduct,
    deleteProduct,
    renderProducts
};

renderProducts();
