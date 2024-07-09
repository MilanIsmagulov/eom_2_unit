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
}

function handleAnswer() {
    const form = contentDiv.querySelector('form');
    const correctAnswers = form.dataset.right.split(',').map(Number);
    const inputs = form.querySelectorAll('input');
    let allCorrect = true;

    inputs.forEach(input => {
        const answerDiv = input.parentElement;
        if (input.checked && correctAnswers.includes(parseInt(input.value))) {
            answerDiv.classList.add('correct');
        } else if (input.checked && !correctAnswers.includes(parseInt(input.value))) {
            answerDiv.classList.add('incorrect');
            allCorrect = false;
        } else if (!input.checked && correctAnswers.includes(parseInt(input.value))) {
            answerDiv.classList.add('correct');
        }
    });

    localStorage.setItem('answer_' + form.id, JSON.stringify({ questionPlace: allCorrect }));
    controlButton2.classList.add('hidden');
    controlButton3.classList.remove('hidden');
}

function resetTest() {
    const answersButtons = document.querySelector('.answers_btn');
    if (answersButtons) {
        answersButtons.remove();
    }

    createTest(`index_${currentPageIndex}`);
    controlButton2.classList.remove('hidden');
    controlButton3.classList.add('hidden');
}

controlButton2.addEventListener('click', handleAnswer);
controlButton3.addEventListener('click', resetTest);

// Initialize the test
// Change 'index_2' to the current test index you need to load
createTest(`index_${currentPageIndex}`);