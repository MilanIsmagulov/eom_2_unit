const answerBtn = document.getElementById('control_button_2');
answerBtn.disabled = false;
answerButton.classList.remove('disabled');


function createTest(index) {
    const content = document.getElementById('content');
    let dynamicContainer = document.getElementById('dynamic-content');

    if (!dynamicContainer) {
        dynamicContainer = document.createElement('div');
        dynamicContainer.id = 'dynamic-content';
        content.appendChild(dynamicContainer);
    } else {
        dynamicContainer.innerHTML = ''; // Clear only dynamic content
    }

    const testData = data[index];
    const test = testData.test;

    const description = test.find(item => item.description).description;
    const imageInfo = test.find(item => item.image !== undefined);
    const testWithText = test.find(item => item.test_with_text);
    const testWithText2 = test.find(item => item.test_with_text_2);

    if (imageInfo.image) {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'image_test_type_2';
        const img = document.createElement('img');
        img.src = imageInfo.image_path;
        img.alt = 'Проверьте image_path';
        imageDiv.appendChild(img);
        dynamicContainer.appendChild(imageDiv);
    }

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'description_w_input';
    const p = document.createElement('p');
    p.innerHTML = description;
    descriptionDiv.appendChild(p);

    if (testWithText) {
        const label = document.createElement('label');
        label.htmlFor = 'test_type_2';
        label.textContent = 'Введите ответ:';
        descriptionDiv.appendChild(label);

        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'test_type_2';
        input.name = 'test_type_2';
        input.dataset.correctAnswer = testWithText.test_with_text.replace(/[\{\}=]/g, '').split(';').map(ans => ans.trim()).join(';');
        descriptionDiv.appendChild(input);
    } else if (testWithText2) {
        const parts = testWithText2.test_with_text_2.split(/\{=.*?\}/);
        const matches = [...testWithText2.test_with_text_2.matchAll(/\{=(.*?)\}/g)];
        parts.forEach((part, index) => {
            const span = document.createElement('span');
            span.textContent = part;
            descriptionDiv.appendChild(span);
            if (matches[index]) {
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'gap';
                input.dataset.correctAnswer = matches[index][1];
                descriptionDiv.appendChild(input);
            }
        });
    }

    dynamicContainer.appendChild(descriptionDiv);

    document.getElementById('control_button_2').style.display = 'inline-block';
    document.getElementById('control_button_3').style.display = 'none';
}

function checkAnswers(index) {
    const content = document.getElementById('dynamic-content');
    const inputs = content.querySelectorAll('input[type="text"]');
    let allCorrect = true;

    inputs.forEach(input => {
        const userAnswer = input.value.trim();
        const correctAnswers = input.dataset.correctAnswer ? input.dataset.correctAnswer.split(';').map(ans => ans.trim()) : [];

        if (correctAnswers.includes(userAnswer)) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
            allCorrect = false;
        }
    });

    localStorage.setItem('answer_answer_form_index_' + index, JSON.stringify({ questionPlace: allCorrect }));

    document.getElementById('control_button_2').style.display = 'none';
    document.getElementById('control_button_3').style.display = 'inline-block';
}

function resetTest(index) {
    createTest(index);
}

document.getElementById('control_button_2').addEventListener('click', () => {
    const index = `index_${currentPageIndex}`; // Example index, replace with dynamic index if needed
    checkAnswers(index);
});

document.getElementById('control_button_3').addEventListener('click', () => {
    const index = `index_${currentPageIndex}`; // Example index, replace with dynamic index if needed
    resetTest(index);
});

// Initial call to create the test
createTest(`index_${currentPageIndex}`); // Example index, replace with dynamic index if needed