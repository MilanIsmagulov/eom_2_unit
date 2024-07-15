const testContainer = document.getElementById('test-container');
// let currentTestIndex = 2; // Default test index, change as needed
// Инициализация текущего индекса страницы
let currentPageIndex = 1;
const answerButton = document.getElementById('control_button_2');
const restartButton = document.getElementById('control_button_3');

// const contentDiv = document.getElementById('content');
const controlButton2 = document.getElementById('control_button_2');
const controlButton3 = document.getElementById('control_button_3');
let currentTestIndex = null;

// Получение ссылки на элемент с id 'content'
const contentDiv = document.getElementById('content');
const mainBody = document.getElementById('main_body_1');

const backWardBtn = document.getElementById('control_button_1');
const nextBtn = document.getElementById('control_button_4');

function addFirstBtn(){
    const answerBtn = document.getElementById('control_button_2');
    const backWardBtn = document.getElementById('control_button_1');
    backWardBtn.classList.remove('hidden');
    answerBtn.classList.remove('hidden');
}


// Функция для создания блока с текстом и изображением
function createTextWithImage(paragraph) {
    const answerBtn = document.getElementById('control_button_2');
    answerBtn.classList.add('hidden');
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
    const answerBtn = document.getElementById('control_button_2');
    answerBtn.classList.add('hidden');
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
    const answerBtn = document.getElementById('control_button_2');
    answerBtn.classList.add('hidden');
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
        function loadScript(src) {
            const script = document.createElement('script');
            script.src = src;
            script.defer = true;
            script.onload = () => {};
            document.head.appendChild(script);
        }
        pageData.test.forEach(testItem => {
            if (testItem.hasOwnProperty('type')) {
                switch (testItem.type) {
                    case 1:
                        loadScript('./scripts/script_of_tests/test_type_1.js');
                        break;
                    case 2:
                        loadScript('./scripts/script_of_tests/test_type_2.js');
                        break;
                    case 3:
                        loadScript('./scripts/script_of_tests/test_type_3.js');
                        break;
                    case 4:
                        loadScript('./scripts/script_of_tests/test_type_4.js');
                        break;
                    case 5:
                        loadScript('./scripts/script_of_tests/test_type_5.js');
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
        const bodyScroll = document.getElementById('contentWrapper')
        bodyScroll.style.overflow = 'hidden';
        popupDiv.classList.remove('disabled');
        popupDiv.classList.add('enabled');
        const backWardBtn = document.getElementById('control_button_1');
        const nextBtn = document.getElementById('control_button_4');
        backWardBtn.classList.add('gray_dis')
        nextBtn.classList.add('gray_dis')
        backWardBtn.disabled = true;
        nextBtn.disabled = true;

        const closeBtn = document.querySelector('#close_popup_btn')
        closeBtn.disabled = false;
        closeBtn.classList.remove('gray_dis');
        closeBtn.classList = 'close_btn';
    }
    function closePopUp(){
        const bodyScroll = document.getElementById('contentWrapper')
        bodyScroll.style.overflow = 'auto';
        const backWardBtn = document.getElementById('control_button_1');
        const nextBtn = document.getElementById('control_button_4');
        if(!pageData.hasOwnProperty('test')){
            backWardBtn.classList.remove('gray_dis')
            nextBtn.classList.remove('gray_dis')
            backWardBtn.disabled = false;
            nextBtn.disabled = false;
        }

        popupDiv.classList.add('disabled')
        popupDiv.classList.remove('enabled')
    }
    function changeStatusBtn(){
        backWardBtn.classList.remove('gray_dis')
        nextBtn.classList.remove('gray_dis')
        backWardBtn.disabled = false;
        nextBtn.disabled = false;
    }
    
    const closePopBtn2 = document.getElementById('close_popup_btn');
    closePopBtn2.addEventListener('click', ()=> changeStatusBtn());

    document.getElementById('close_popup_btn').addEventListener('click', () => closePopUp());
    document.getElementById('popup_button_1').addEventListener('click', () => showPopUp());

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



restartButton.disabled = false;
// Начальное отображение первой страницы и маркеров
displayPage(currentPageIndex);
createMarkers();
