// answerButton.classList.add('gray_dis');
// answerButton.disabled = true;
// answerButton.classList.remove('disabled');

// backWardBtn.classList.add('gray_dis')
// nextBtn.classList.add('gray_dis')
// backWardBtn.disabled = true;
// nextBtn.disabled = true;

function createTest(index) {
    const test = data[index].test;
    const answers = test.find(item => item.answers).answers;
    const correctAnswers = test.find(item => item.correct_answer).correct_answer;
    const image = test.find(item => item.image);

    const answersDiv = document.createElement('div');
    answersDiv.className = 'answers_btn';
    answersDiv.id = `answers_buttons_${index}`;

    if (image && image.image) {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'answer_form_img';
        const img = document.createElement('img');
        img.src = image.image_path;
        imgDiv.appendChild(img);
        answersDiv.appendChild(imgDiv);
    }

    const form = document.createElement('form');
    form.className = 'answer_form';
    form.id = `answer_form_${index}`;
    form.dataset.right = correctAnswers.join(',');

    answers.forEach((answer, i) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer_div';

        const input = document.createElement('input');
        input.type = correctAnswers.length > 1 ? 'checkbox' : 'radio';
        input.name = index;
        input.value = i;

        const p = document.createElement('p');
        p.textContent = answer;

        answerDiv.appendChild(input);
        answerDiv.appendChild(p);
        form.appendChild(answerDiv);
    });

    answersDiv.appendChild(form);
    contentDiv.appendChild(answersDiv);

    // Функция для обновления состояния кнопки
    function updateButtonState() {
        const inputs = form.querySelectorAll('input');
        const anyChecked = Array.from(inputs).some(input => input.checked);

        if (anyChecked) {

            answerButton.classList.remove('gray_dis');
            answerButton.disabled = false;
        } else {
            answerButton.classList.add('gray_dis');
            answerButton.disabled = true;
        }
    }

    // Инициализация состояния кнопки при загрузке страницы
    updateButtonState();

    // Найти все input элементы и добавить слушатель события 'change'
    form.querySelectorAll('input').forEach((input) => {
        input.addEventListener('change', updateButtonState);
    });
}

function blockInputs(){
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => {
        input.disabled = true;
    });
}

function checkAnswers() {
    const form = contentDiv.querySelector('form');
    const correctAnswers = form.dataset.right.split(',').map(Number);
    const inputs = form.querySelectorAll('input');

    let allCorrect = true;
    // backWardBtn.classList.remove('gray_dis')
    // nextBtn.classList.remove('gray_dis')
    // backWardBtn.disabled = false;
    // nextBtn.disabled = false;
    inputs.forEach(input => {
        const answerDiv = input.parentElement;
        answerDiv.classList.remove('correct', 'incorrect');
        if (input.checked) {
            if (correctAnswers.includes(parseInt(input.value))) {
                blockInputs();
                answerDiv.classList.add('correct');
            } else {
                blockInputs();
                answerDiv.classList.add('incorrect');
                allCorrect = false;
            }
        } else {
            if (correctAnswers.includes(parseInt(input.value))) {
                blockInputs();
                allCorrect = false;
                answerDiv.classList.add('incorrect');
            }
        }
    });

    localStorage.setItem('answer_' + form.id, JSON.stringify({ questionPlace: allCorrect }));
    answerButton.classList.add('hidden');
    restartButton.classList.remove('hidden');
}

function resetTest(){
    const answersButtons = document.querySelector('.answers_btn');
    if (answersButtons) {
        answersButtons.remove();
    }
    // backWardBtn.classList.add('gray_dis')
    // nextBtn.classList.add('gray_dis')
    // backWardBtn.disabled = true;
    // nextBtn.disabled = true;
    createTest(`index_${currentPageIndex}`);
    answerButton.classList.remove('hidden');
    restartButton.classList.add('hidden');
    answerButton.addEventListener('click', checkAnswers);
    restartButton.addEventListener('click', resetTest);
}

function loadtest(){
    removeAllEventListeners();
    // Initialize the test
    resetTest();
    answerButton.addEventListener('click', handleAnswer);
    restartButton.addEventListener('click', resetTest);
    createTest(`index_${currentPageIndex}`);
}

resetTest();
