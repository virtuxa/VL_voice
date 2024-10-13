function loadContent(page) {
    fetch(page)
      .then(response => response.text())
      .then(html => {
        // Заменяем содержимое только внутри элемента с классом thirdbar
        document.querySelector('.thirdbar').innerHTML = html;
      })
      .catch(error => console.log('Ошибка загрузки контента:', error));
  }
  