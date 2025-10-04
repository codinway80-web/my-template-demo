// Simple hardcoded admin login (for demo)
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.onsubmit = function(e) {
    e.preventDefault();
    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value;
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.setItem('isAdmin', '1');
        window.location.href = 'admin.html';
    } else {
        loginError.textContent = 'Invalid username or password.';
    }
};
