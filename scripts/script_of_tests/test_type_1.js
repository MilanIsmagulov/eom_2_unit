

function createTest(testData, index) {
    const testContainer = document.createElement('div');
    testContainer.className = 'answers_btn';
    testContainer.id = `answers_buttons_${index}`;

    const imageInfo = testData.find(item => item.image !== undefined);
    if (imageInfo && imageInfo.image) {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'answer_form_img';
        const img = document.createElement('img');
        img.src = imageInfo.image_path;
        imageDiv.appendChild(img);
        testContainer.appendChild(imageDiv);
    }

    const form = document.createElement('form');
    form.className = 'answer_form';
    form.id = `answer_form_${index}`;

    const correctAnswer = testData.find(item => item.correct_answer !== undefined);
    if (correctAnswer) {
        form.dataset.right = correctAnswer.correct_answer.join(',');
    }

    const answers = testData.find(item => item.answers !== undefined);
    if (answers) {
        answers.answers.forEach((answer, i) => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'answer_div';

            const input = document.createElement('input');
            input.type = correctAnswer.correct_answer.length > 1 ? 'checkbox' : 'radio';
            input.name = index;
            input.value = i;
            answerDiv.appendChild(input);

            const p = document.createElement('p');
            p.textContent = answer;
            answerDiv.appendChild(p);

            // Add click event listener to answerDiv
            answerDiv.addEventListener('click', (event) => {
                if (event.target !== input) {
                    input.checked = !input.checked;
                }
            });

            form.appendChild(answerDiv);
        });
    }

    testContainer.appendChild(form);
    return testContainer;
}

function displayTest() {
    const testData = data.index_2.test;
    const testIndex = '2';
    const testElement = createTest(testData, testIndex);
    contentDiv.appendChild(testElement);
}

function checkAnswers() {
    const form = document.querySelector('.answer_form');
    if (!form) return;

    const correctAnswers = form.dataset.right.split(',').map(Number);
    const inputs = form.querySelectorAll('input');
    let userAnswers = [];
    inputs.forEach(input => {
        if (input.checked) {
            userAnswers.push(Number(input.value));
        }
    });

    const isMultipleChoice = correctAnswers.length > 1;

    if (isMultipleChoice) {
        // Multiple choice logic
        let hasIncorrect = false;
        inputs.forEach(input => {
            const answerDiv = input.closest('.answer_div');
            if (input.checked) {
                if (correctAnswers.includes(Number(input.value))) {
                    answerDiv.classList.add('correct');
                } else {
                    answerDiv.classList.add('incorrect');
                    hasIncorrect = true;
                }
            }
        });
        if (!hasIncorrect) {
            inputs.forEach(input => {
                if (correctAnswers.includes(Number(input.value)) && input.checked) {
                    const answerDiv = input.closest('.answer_div');
                    answerDiv.classList.add('correct');
                }
            });
        }
    } else {
        // Single choice logic
        inputs.forEach(input => {
            const answerDiv = input.closest('.answer_div');
            if (input.checked) {
                if (correctAnswers.includes(Number(input.value))) {
                    answerDiv.classList.add('correct');
                } else {
                    answerDiv.classList.add('incorrect');
                }
            }
        });
    }

    localStorage.setItem('answer2', JSON.stringify({ questionPlace: !userAnswers.some(ans => !correctAnswers.includes(ans)) }));
    answerButton.classList.add('hidden');
    restartButton.classList.remove('hidden');
}

function restartTest() {
    contentDiv.innerHTML = '';
    displayTest();
    answerButton.classList.remove('hidden');
    restartButton.classList.add('hidden');
}

answerButton.addEventListener('click', checkAnswers);
restartButton.addEventListener('click', restartTest);

displayTest();