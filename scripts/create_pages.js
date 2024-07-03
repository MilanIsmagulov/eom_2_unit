let currentPageIndex = 1;
const contentDiv = document.getElementById('content');
// const stepMarkerPlace = document.getElementById('step_marker_place'); // контейнер для маркеров

function createTextWithImage(paragraph) {
    const container = document.createElement('div');
    container.className = 'text_with_img';

    paragraph.forEach(item => {
        if (item.text) {
            const textElement = document.createElement('p');
            textElement.innerHTML = item.text; // Используем innerHTML для поддержки HTML-тегов
            container.appendChild(textElement);
        }
        if (item.image) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'img_with_sgn';
            const imgElement = document.createElement('img');
            imgElement.src = item.image_path;
            imgElement.alt = 'image';
            const caption = document.createElement('p');
            caption.textContent = item.img_sign || 'Текст подпись к рисунку (Проверьте данные в data.js)'; // Уникальная подпись
            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(caption);
            container.appendChild(imgContainer);
        }
    });

    return container;
}

function createOnlyImage(paragraph) {
    const container = document.createElement('div');
    container.className = 'only_img';

    paragraph.forEach(item => {
        if (item.image) {
            const imgElement = document.createElement('img');
            imgElement.src = item.image_path;
            imgElement.alt = 'image';
            const caption = document.createElement('p');
            caption.textContent = item.img_sign || 'Текст подпись к рисунку (Проверьте данные в data.js)'; // Уникальная подпись
            container.appendChild(imgElement);
            container.appendChild(caption);
        }
    });

    return container;
}

function createPlainText(paragraph) {
    const container = document.createElement('div');
    container.className = 'plane_text';

    paragraph.forEach(item => {
        if (item.text) {
            const textElement = document.createElement('p');
            textElement.innerHTML = item.text; // Используем innerHTML для поддержки HTML-тегов
            container.appendChild(textElement);
        }
    });

    return container;
}

function displayPage(index) {
    const pageData = data[`index_${index}`];
    contentDiv.innerHTML = '';

    if (pageData.hasOwnProperty('paragraph_1')) {
        for (let key in pageData) {
            const paragraph = pageData[key];
            let element;
            if (paragraph.some(item => item.text) && paragraph.some(item => item.image)) {
                element = createTextWithImage(paragraph);
            } else if (paragraph.some(item => item.image)) {
                element = createOnlyImage(paragraph);
            } else if (paragraph.some(item => item.text)) {
                element = createPlainText(paragraph);
            }
            contentDiv.appendChild(element);
        }
    } else if (pageData.hasOwnProperty('test')) {
        const testDiv = document.createElement('div');
        testDiv.innerHTML = `<p>ТУТ ДОЛЖЕН БЫТЬ ТЕСТ</p>`; //${pageData[1].text_of_question}
        contentDiv.appendChild(testDiv);
    } else if (pageData.hasOwnProperty('result')) {
        const testDiv = document.createElement('div');
        testDiv.innerHTML = `<p>ТУТ ДОЛЖНЫ БЫТЬ РЕЗУЛЬТАТЫ ТЕСТА</p>`; //${pageData[1].text_of_question}
        contentDiv.appendChild(testDiv);
    }
}

function createMarkers() {
    const numOfPages = Object.keys(data).length;
    stepMarkerPlace.innerHTML = ''; // Очистить все маркеры

    for (let i = 0; i < numOfPages; i++) {
        let marker = document.createElement('img');
        if (i === currentPageIndex - 1) {
            marker.src = "./content/radio_button_blue.svg";
            marker.classList.add('radio_button_blue');
        } else {
            marker.src = "./content/radio_button.svg";
            marker.classList.add('radio_button_gray');
        }
        stepMarkerPlace.appendChild(marker);
    }
}

function updatePage(step) {
    const numOfPages = Object.keys(data).length;
    if ((currentPageIndex + step) >= 1 && (currentPageIndex + step) <= numOfPages) {
        currentPageIndex += step;
        displayPage(currentPageIndex);
        createMarkers();
    }
}

document.getElementById('control_button_1').addEventListener('click', () => updatePage(-1));
document.getElementById('control_button_4').addEventListener('click', () => updatePage(1));

// Display the first page and markers initially
displayPage(currentPageIndex);
createMarkers();
