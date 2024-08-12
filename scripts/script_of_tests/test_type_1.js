function waitForData() {
    if (window.dataLoaded) {
        // Функция для создания теста
        function createTest(index) {

            const testData = data[index];
            const test = testData.test;
            const contentDiv = document.getElementById('content');
            let dynamicContainer = document.getElementById('dynamic-content');
            
            if (!dynamicContainer) {
                dynamicContainer = document.createElement('div');
                dynamicContainer.id = 'dynamic-content';
                contentDiv.appendChild(dynamicContainer);
            } else {
                dynamicContainer.innerHTML = '';
            }

            const description = test.find(item => item.description)?.description;
            const imageInfo = test.find(item => item.image);
            const testWithText = test.find(item => item.test_with_text);
            const testWithText2 = test.find(item => item.test_with_text_2);
            const answers = test.find(item => item.answers)?.answers;
            const correctAnswers = test.find(item => item.correct_answer)?.correct_answer;

            // Отображение описания и элементов ввода
            if (description || testWithText || testWithText2) {
                const descriptionDiv = document.createElement('div');
                descriptionDiv.className = 'description_w_input';
                
                if (description) {
                    const p = document.createElement('p');
                    p.innerHTML = description;
                    descriptionDiv.appendChild(p);
                }

                if (testWithText) {
                    const label = document.createElement('label');
                    label.htmlFor = 'test_type_2';
                    label.textContent = 'Введите ответ:';
                    descriptionDiv.appendChild(label);

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.id = 'test_type_2';
                    input.setAttribute('autocomplete', 'off');
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
                            input.setAttribute('autocomplete', 'off');
                            input.dataset.correctAnswer = matches[index][1];
                            descriptionDiv.appendChild(input);
                        }
                    });
                }

                dynamicContainer.appendChild(descriptionDiv);
            }

            // Отображение изображения, если имеется
            if (imageInfo && test.find(item => item.type === 1) || test.find(item => item.type === 2)) {
                const imageDiv = document.createElement('div');
                imageDiv.className = 'image_test_type_2';
                const img = document.createElement('img');
                img.src = imageInfo.image_path;
                img.alt = 'Проверьте image_path';
                imageDiv.appendChild(img);
                dynamicContainer.appendChild(imageDiv);
            }

            // Отображение теста с вариантами ответов
            if (answers && correctAnswers) {
                const answersDiv = document.createElement('div');
                answersDiv.className = 'answers_btn';
                answersDiv.id = `answers_buttons_${index}`;

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
                dynamicContainer.appendChild(answersDiv);

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

                // Добавление слушателей событий для input элементов
                form.querySelectorAll('input').forEach((input) => {
                    input.addEventListener('change', updateButtonState);
                });
            }

            document.getElementById('control_button_2').style.display = 'inline-block';
            document.getElementById('control_button_3').style.display = 'none';

            if (testWithText) {
                const inputField = document.querySelector('#test_type_2');
                inputField.addEventListener('input', (event) => {
                    if (event.target.value.length > 0) {
                        answerButton.classList.remove('gray_dis');
                        answerButton.disabled = false;
                    }
                });
            }

            if (testWithText2) {
                const gapElements = document.querySelectorAll('.gap');
                gapElements.forEach((element) => {
                    element.addEventListener('input', (event) => {
                        if (event.target.value.length > 0) {
                            answerButton.classList.remove('gray_dis');
                            answerButton.disabled = false;
                        } else {
                            answerButton.classList.add('gray_dis');
                            answerButton.disabled = true;
                        }
                    });
                });
            }
        }

        // Функция для блокировки всех элементов ввода
        function blockInputs() {
            const inputs = document.querySelectorAll('input');
            inputs.forEach((input) => {
                input.disabled = true;
            });
        }

        // Функция для проверки теста с вариантами ответов
        function checkAnswers() {
            const form = document.querySelector('.answer_form');
            const correctAnswers = form.dataset.right.split(',').map(Number);
            const inputs = form.querySelectorAll('input');

            let allCorrect = true;

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

            document.getElementById('control_button_2').style.display = 'none';
            document.getElementById('control_button_3').style.display = 'inline-block';

            localStorage.setItem(form.id, JSON.stringify({ questionPlace: allCorrect }));
            answerButton.classList.add('hidden');
            restartButton.classList.remove('hidden');
        }

        // Функция для проверки текстовых тестов
        function checkTextAnswers(index) {
            const content = document.getElementById('dynamic-content');
            const inputs = content.querySelectorAll('input');
            let allCorrect = true;

            inputs.forEach(input => {
                const userAnswer = input.value.trim();
                const correctAnswers = input.dataset.correctAnswer ? input.dataset.correctAnswer.split(',').map(ans => ans.trim()) : [];

                if (correctAnswers.includes(userAnswer)) {
                    input.classList.add('correct');
                    input.classList.remove('incorrect');
                } else {
                    input.classList.add('incorrect');
                    input.classList.remove('correct');
                    allCorrect = false;
                }
            });

            localStorage.setItem('answer_from_' + index, JSON.stringify({ questionPlace: allCorrect }));

            document.getElementById('control_button_2').style.display = 'none';
            document.getElementById('control_button_3').style.display = 'inline-block';
        }

        // Функция для сброса теста
        function resetTest() {
            const dynamicContainer = document.getElementById('dynamic-content');
            if (dynamicContainer) {
                dynamicContainer.innerHTML = '';
            }
            answerButton.classList.add('gray_dis');
            answerButton.disabled = true;
            restartButton.classList.remove('hidden');
            createTest(`index_${currentPageIndex}`);
            answerButton.classList.remove('hidden');
            answerButton.onclick = function(){
                const index = `index_${currentPageIndex}`;
                if (document.querySelector('.answers_btn')) {
                    checkAnswers();
                } else {
                    checkTextAnswers(index);
                }
            };

            restartButton.addEventListener('click', resetTest);
        }

        // Инициализация первого теста при загрузке страницы
        resetTest();
        function checkAnwser(){

        }
        // Логика, которая зависит от данных
        console.log("Данные загружены, продолжаем выполнение скрипта.");
    } else {
        // Если данные ещё не загружены, ждем и проверяем снова
        setTimeout(waitForData, 50);
    }
}

waitForData();

