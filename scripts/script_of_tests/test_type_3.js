document.getElementById('control_button_3').style.display = 'none';
document.getElementById('control_button_2').style.display = 'inline-block';

function waitForData() {
    if (window.dataLoaded) {
        // Логика, которая зависит от данных
        answerButton.onclick = function(){
            checkAnwser3();
            answerButton.classList.add('hidden');
            restartButton.classList.remove('hidden');
            document.getElementById('control_button_2').style.display = 'none';
            document.getElementById('control_button_3').style.display = 'inline-block';
        }

        function  checkAnwser3(){
            console.log("Ты нажал кнопку");
        }

        console.log("Данные загружены, продолжаем выполнение скрипта.");
    } else {
        // Если данные ещё не загружены, ждем и проверяем снова
        setTimeout(waitForData, 50);
    }
}

waitForData();

