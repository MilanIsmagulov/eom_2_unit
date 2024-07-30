// Инициализация текущего индекса страницы
let currentPageIndex = 1;
let currentTestIndex = null;
const answerButton = document.getElementById('control_button_2');
const restartButton = document.getElementById('control_button_3');
const testContainer = document.getElementById('test-container');
const contentDiv = document.getElementById('content');
const mainBody = document.getElementById('main_body_1');
const backWardBtn = document.getElementById('control_button_1');
const nextBtn = document.getElementById('control_button_4');
const answerBtn = document.getElementById('control_button_2');


function addFirstBtn(){
    const answerBtn = document.getElementById('control_button_2');
    const backWardBtn = document.getElementById('control_button_1');
    backWardBtn.classList.remove('hidden');
    answerBtn.classList.remove('hidden');
}

backWardBtn.classList.add('gray_dis');
backWardBtn.disabled = true;

function clearLocalStorage(){
    if (currentPageIndex == 1){
        localStorage.clear();
    }  
}


// Функция для создания блока с текстом и изображением
function createTextWithImage(paragraph) {
    showAnswerBtn();
    const answerBtn = document.getElementById('control_button_2');
    answerBtn.classList.add('gray_dis');
    const reloadBtn = document.getElementById('control_button_3');
    reloadBtn.classList.add('hidden');
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
    showAnswerBtn();
    const answerBtn = document.getElementById('control_button_2');
    answerBtn.classList.add('gray_dis');
    const reloadBtn = document.getElementById('control_button_3');
    reloadBtn.classList.add('hidden');
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
    showAnswerBtn();
    const answerBtn = document.getElementById('control_button_2');
    answerBtn.classList.add('gray_dis');
    const reloadBtn = document.getElementById('control_button_3');
    reloadBtn.classList.add('hidden');
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
        const answerBtn = document.getElementById('control_button_2');
        answerBtn.classList.remove('hidden');
    
        pageData.test.forEach(testItem => {
            if (testItem.hasOwnProperty('type')) {
                switch (testItem.type) {
                    case 1:
                        console.log('Неизвестный тип теста');
                        //replaceScript('./scripts/script_of_tests/test_type_1.js', 'test-script');
                        break;
                    case 2:
                        console.log('Неизвестный тип теста');
                        //replaceScript('./scripts/script_of_tests/test_type_1.js', 'test-script');
                        break;
                    case 3:
                        replaceScript('./scripts/script_of_tests/test_type_2.js', 'test-script');
                        break;
                    case 4:
                        replaceScript('./scripts/script_of_tests/test_type_4.js', 'test-script');
                        break;
                    case 5:
                        replaceScript('./scripts/script_of_tests/test_type_5.js', 'test-script');
                        break;
                    default:
                        console.log('Неизвестный тип теста');
                        break;
                }
            }
        });

    } else if (pageData.hasOwnProperty('result')) {
        const script = document.createElement('script');
        script.src = './scripts/script_of_tests/result_of_test.js';
        script.async = true;
        script.onload = () => {};
        document.head.appendChild(script);
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
        logicOfButtons();
        const bodyScroll = document.getElementById('contentWrapper')
        bodyScroll.style.overflow = 'hidden';
        popupDiv.classList.remove('disabled');
        popupDiv.classList.add('enabled');
        const closeBtn = document.querySelector('#close_popup_btn')
        closeBtn.disabled = false;
        closeBtn.classList.remove('gray_dis');
        closeBtn.classList = 'close_btn';
    }
    function closePopUp(){
        logicOfButtons();
        const bodyScroll = document.getElementById('contentWrapper')
        bodyScroll.style.overflow = 'auto';
        popupDiv.classList.add('disabled')
        popupDiv.classList.remove('enabled')
    }

    document.getElementById('close_popup_btn').addEventListener('click', () => closePopUp());
    document.getElementById('popup_button_1').addEventListener('click', () => showPopUp());

    function logicOfButtons(){
        const modalWindow = document.getElementById('popup_window_id')

        if (!modalWindow.classList.contains('disabled') && !pageData.hasOwnProperty('test')){
            console.log('Модальное окно закрыто и мы на странице теории!')
        } else if (!modalWindow.classList.contains('enabled') && !pageData.hasOwnProperty('test')){
            console.log('Модальное окно открыто и мы на странице теории!')
        } else if (!modalWindow.classList.contains('disabled') && pageData.hasOwnProperty('test')){
            console.log('Модальное окно закрыто и мы на странице теста!')
        } else if (!modalWindow.classList.contains('enabled') && pageData.hasOwnProperty('test')){
            console.log('Модальное окно открыто и мы на странице теста!')
        }
        if (answerBtn.classList.contains('gray_dis')){
            console.log('Кнопка ответа заблокированна!!!')
        } else {
            console.log('Кнопка ответа разблокированна!!!')
        }
    }
}



// const stepMarkerPlace = document.getElementsByClassName('step_marker')
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


// Удаление всех обработчиков событий с кнопок
function removeAllEventListeners() {
    document.getElementById('control_button_2').removeEventListener('click', checkAnswers);
    document.getElementById('control_button_3').removeEventListener('click', resetTest);
}

// Очистка контента страницы перед загрузкой нового теста
function clearContent() {
    contentDiv.innerHTML = '';
}

// Обновленная функция для замены скрипта теста
function replaceScript(src, id) {
    const existingScript = document.getElementById(id);
    if (existingScript) {
        existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.id = id;
    document.head.appendChild(script);
}

// Удаление скриптов тестов и очистка контента перед переходом на новую страницу
function removeTestScripts() {
    const existingScript = document.getElementById('test-script');
    if (existingScript) {
        existingScript.remove();
    }

    clearContent();
}

// Обновленная функция для обновления страницы
function updatePage(step) {
    showAnswerBtn();
    
    // Удаляем скрипты тестов перед переходом на новую страницу
    removeTestScripts();
    clearLocalStorage();
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
    const closeBtn2 = document.querySelector('#close_popup_btn');
    closeBtn2.disabled = false;
    closeBtn2.classList.remove('gray_dis');
    closeBtn2.classList = 'close_btn';
    if (currentPageIndex == Object.keys(data).length){
        nextBtn.classList.add('gray_dis')
        nextBtn.disabled = true;
    }
    if (currentPageIndex !== Object.keys(data).length){
        nextBtn.classList.remove('gray_dis')
        nextBtn.disabled = false;
    }
    if (currentPageIndex == 1){
        backWardBtn.classList.add('gray_dis')
        backWardBtn.disabled = true;
    }
    if (currentPageIndex !== 1){
        backWardBtn.classList.remove('gray_dis')
        backWardBtn.disabled = false;
    }

}

function showAnswerBtn(){
    answerButton.classList.add('gray_dis')
    answerButton.disabled = true;
    restartButton.classList.add('hidden')
}

// Добавление обработчиков событий для кнопок навигации
document.getElementById('control_button_1').addEventListener('click', () => updatePage(-1));
document.getElementById('control_button_4').addEventListener('click', () => updatePage(1));

// Начальное отображение первой страницы и маркеров
displayPage(currentPageIndex);
createMarkers();
