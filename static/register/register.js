function showDescription() {
    document.getElementById('description-text').style.display = 'block';
}

function hideDescription() {
    document.getElementById('description-text').style.display = 'none';
}

function checkPasswords() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');
  
    if (password !== confirmPassword) {
      errorMessage.style.display = 'block';
      return false; // Предотвращает отправку формы
    } else {
      errorMessage.style.display = 'none';
      return true; // Разрешает отправку формы
    }
  }
  