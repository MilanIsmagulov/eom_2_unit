// Инициализация текущего индекса страницы
let currentPageIndex = 1;


// Получение ссылки на элемент с id 'content'
const contentDiv = document.getElementById('content');
const mainBody = document.getElementById('main_body_1');
// Функция для создания блока с текстом и изображением
function createTextWithImage(paragraph) {
    // Создание контейнера
    const container = document.createElement('div');
    // Присвоение класса контейнеру
    container.className = 'text_with_img';

    // Перебор элементов параграфа
    paragraph.forEach(item => {
        // Если есть текст, создаем и добавляем текстовый элемент
        if (item.text) {
            const textElement = document.createElement('p');
            textElement.innerHTML = item.text; // Использование innerHTML для поддержки HTML-тегов
            container.appendChild(textElement);
        }
        // Если есть изображение, создаем и добавляем элемент изображения
        if (item.image) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'img_with_sgn';
            const imgElement = document.createElement('img');
            imgElement.src = item.image_path;
            imgElement.alt = 'image';
            const caption = document.createElement('p');
            caption.textContent = item.img_sign || 'Текст подпись к рисунку (Проверьте данные в data.js)';
            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(caption);
            container.appendChild(imgContainer);
        }
    });

    // Возвращаем созданный контейнер
    return container;
}

// Функция для создания блока только с изображением
function createOnlyImage(paragraph) {
    // Создание контейнера
    const container = document.createElement('div');
    // Присвоение класса контейнеру
    container.className = 'only_img';

    // Перебор элементов параграфа
    paragraph.forEach(item => {
        // Если есть изображение, создаем и добавляем элемент изображения
        if (item.image) {
            const imgElement = document.createElement('img');
            imgElement.src = item.image_path;
            imgElement.alt = 'image';
            const caption = document.createElement('p');
            caption.textContent = item.img_sign || 'Текст подпись к рисунку (Проверьте данные в data.js)';
            container.appendChild(imgElement);
            container.appendChild(caption);
        }
    });

    // Возвращаем созданный контейнер
    return container;
}

// Функция для создания блока только с текстом
function createPlainText(paragraph) {
    // Создание контейнера
    const container = document.createElement('div');
    // Присвоение класса контейнеру
    container.className = 'plane_text';

    // Перебор элементов параграфа
    paragraph.forEach(item => {
        // Если есть текст, создаем и добавляем текстовый элемент
        if (item.text) {
            const textElement = document.createElement('p');
            textElement.innerHTML = item.text; // Использование innerHTML для поддержки HTML-тегов
            container.appendChild(textElement);
        }
    });

    // Возвращаем созданный контейнер
    return container;
}

// Функция для отображения страницы
function displayPage(index) {
    // Получение данных страницы по индексу
    const pageData = data[`index_${index}`];
    // Очистка содержимого контейнера
    contentDiv.innerHTML = '';

    // Добавление подзаголовка с нумерацией
    if (pageData.subtitle) {
        const subtitleWrapper = document.createElement('div');
        const subtitleButtonPop = document.createElement('button');
        const spanOfDiscription = document.createElement('span');
        subtitleButtonPop.id = 'popup_button_1';
        subtitleButtonPop.innerHTML = `<img src="./content/description.svg" alt="desc">`;
        subtitleWrapper.className = 'subtitle_wrapper';
        contentDiv.appendChild(subtitleWrapper);
        const subtitleDiv = document.createElement('div');
        subtitleDiv.className = 'number_of_step';
        const subtitleSpan = document.createElement('span');
        subtitleSpan.className = 'pink_subtitle';
        subtitleSpan.innerHTML = ` ${pageData.subtitle}`;
        subtitleDiv.innerHTML = `${index}.`;
        spanOfDiscription.classList = 'span_of_discription';
        subtitleDiv.appendChild(subtitleSpan);
        subtitleWrapper.appendChild(subtitleDiv);
        subtitleWrapper.appendChild(spanOfDiscription);
        spanOfDiscription.appendChild(subtitleButtonPop);
        spanOfDiscription.innerHTML += `${index}/${Object.keys(data).length}`
    }

    // Проверка наличия параграфов на странице
    if (pageData.hasOwnProperty('paragraph_1')) {
        // Перебор всех параграфов страницы
        for (let key in pageData) {
            if (key.startsWith('paragraph_')) {
                const paragraph = pageData[key];
                let element;
                // Определение типа параграфа и создание соответствующего элемента
                if (paragraph.some(item => item.text) && paragraph.some(item => item.image)) {
                    element = createTextWithImage(paragraph);
                } else if (paragraph.some(item => item.image)) {
                    element = createOnlyImage(paragraph);
                } else if (paragraph.some(item => item.text)) {
                    element = createPlainText(paragraph);
                }
                // Добавление созданного элемента на страницу
                contentDiv.appendChild(element);
            }
        }
    } else if (pageData.hasOwnProperty('test')) {
        // Если страница содержит тест, отображаем заглушку
        const testDiv = document.createElement('div');
        testDiv.innerHTML = `<p>ТУТ ДОЛЖЕН БЫТЬ ТЕСТ</p>`;
        contentDiv.appendChild(testDiv);
    } else if (pageData.hasOwnProperty('result')) {
        // Если страница содержит результаты теста, отображаем заглушку
        const testDiv = document.createElement('div');
        testDiv.innerHTML = `<p>ТУТ ДОЛЖНЫ БЫТЬ РЕЗУЛЬТАТЫ ТЕСТА</p>`;
        contentDiv.appendChild(testDiv);
    }

    // Добавление содержимого модального окна
    const popupDiv = document.createElement('div');
    const closePopUpBtn = document.createElement('button');
    closePopUpBtn.innerHTML = `<img src="./content/close.svg" alt="close">`;
    closePopUpBtn.id = 'close_popup_btn';
    popupDiv.className = 'popup_window disabled';
    popupDiv.id = 'popup_window_id';
    for (let i = 1; i <= Object.keys(data).length; i++) {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step_of_popup';
        if (i === index) {
            stepDiv.classList.add('current_step');
        }
        stepDiv.innerHTML = data[`index_${i}`].step_of_popup;
        popupDiv.appendChild(stepDiv);
    }
    contentDiv.appendChild(popupDiv);
    popupDiv.appendChild(closePopUpBtn);

    function showPopUp(){
        // Блокируем скролл страницы
        const bodyScroll = document.getElementById('contentWrapper')
        bodyScroll.style.overflow = 'hidden';
        popupDiv.classList.remove('disabled')
        popupDiv.classList.add('enabled')
        // Отключаем все кнопки на странице
        const buttons = document.querySelectorAll('button, a');
        buttons.forEach(button => {
            button.classList += 'gray_dis';
            if (button.id != 'close_popup_btn'){
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        });
        const closeBtn = document.querySelector('#close_popup_btn')
        closeBtn.disabled = false;
        closeBtn.classList.remove('gray_dis');
        closeBtn.classList = 'close_btn';
    }
    function closePopUp(){
        const bodyScroll = document.getElementById('contentWrapper')
        bodyScroll.style.overflow = 'auto';
        const buttons = document.querySelectorAll('button, a');
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove('gray_dis');
        });
        popupDiv.classList.add('disabled')
        popupDiv.classList.remove('enabled')
    }
    document.getElementById('close_popup_btn').addEventListener('click', () => closePopUp());
    document.getElementById('popup_button_1').addEventListener('click', () => showPopUp());

}

// Функция для создания маркеров страниц
function createMarkers() {
    // Получение количества страниц
    const numOfPages = Object.keys(data).length;
    // Очистка контейнера маркеров
    stepMarkerPlace.innerHTML = '';

    // Создание маркеров для каждой страницы
    for (let i = 0; i < numOfPages; i++) {
        let marker = document.createElement('img');
        if (i === currentPageIndex - 1) {
            // Если это текущая страница, используем синий маркер
            marker.src = "./content/radio_button_blue.svg";
            marker.classList.add('radio_button_blue');
        } else {
            // Иначе используем серый маркер
            marker.src = "./content/radio_button.svg";
            marker.classList.add('radio_button_gray');
        }
        // Добавление маркера в контейнер
        stepMarkerPlace.appendChild(marker);
    }
}

// Функция для обновления страницы
function updatePage(step) {
    // Получение количества страниц
    const numOfPages = Object.keys(data).length;
    // Проверка, что новый индекс страницы в допустимых пределах
    if ((currentPageIndex + step) >= 1 && (currentPageIndex + step) <= numOfPages) {
        // Обновление индекса текущей страницы
        currentPageIndex += step;
        // Отображение новой страницы
        displayPage(currentPageIndex);
        // Обновление маркеров
        createMarkers();

    }
    const closeBtn2 = document.querySelector('#close_popup_btn')
    closeBtn2.disabled = false;
    closeBtn2.classList.remove('gray_dis');
    closeBtn2.classList = 'close_btn';
}


// Добавление обработчиков событий для кнопок навигации
document.getElementById('control_button_1').addEventListener('click', () => updatePage(-1));
document.getElementById('control_button_4').addEventListener('click', () => updatePage(1));

// Начальное отображение первой страницы и маркеров
displayPage(currentPageIndex);
createMarkers();
