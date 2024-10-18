// public/js/auth.js
window.addEventListener('load', () => {
    fetch('/check-auth')
        .then(response => response.json())
        .then(data => {
            if (!data.isAuthenticated) {
                window.location.href = '/login';
            }
        })
        .catch(error => console.error('Ошибка авторизации:', error));
});
