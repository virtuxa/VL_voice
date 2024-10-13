function loadContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.querySelector('.thirdbar').innerHTML = html;
        })
        .catch(error => console.log('Ошибка загрузки контента:', error));
}