let stepMarkerPlace = document.querySelector('.step_marker');
let backButton  = document.querySelector('#control_button_1');
let forwardButton  = document.querySelector('#control_button_4');
let titleUpper = document.querySelector('#upper_title');
let blackHeader  = document.querySelector('#header_text');
let numberOfQuestion = 1; 
let numberOfQuestionSum = 10;

let windowWidth  = window.innerWidth;
console.log(windowWidth)
function adjustContentWrapper() {
    const headerHeight = document.getElementById('header').offsetHeight;
    const footerHeight = document.getElementById('footer').offsetHeight;
    const contentWrapper = document.getElementById('contentWrapper');

    contentWrapper.style.paddingTop = headerHeight + 'px';
    contentWrapper.style.paddingBottom = footerHeight + 'px';
}

window.addEventListener('load', adjustContentWrapper);
window.addEventListener('resize', adjustContentWrapper);

for (let i = 0; i < numberOfQuestion; i++){
    let markers = document.createElement('img');
    markers.src = "./content/radio_button_blue.svg";
    stepMarkerPlace.appendChild(markers);
}

for (let i = 0; i < numberOfQuestionSum-numberOfQuestion; i++){
    let markers = document.createElement('img');
    markers.src = "./content/radio_button.svg";
    stepMarkerPlace.appendChild(markers);
}

window.addEventListener('resize',(e) => {
    let windowWidth  = window.innerWidth;
    if (windowWidth  <=  1000)  {
        forwardButton.innerHTML  =  '<img src="./content/arrow_forward.svg" alt="<">';
        backButton.innerHTML  =  '<img src="./content/arrow_back.svg" alt="<">';
    } else {
        backButton.textContent  =  'Назад';
        forwardButton.textContent  =  'Далее';
    }
});

titleUpper.innerHTML = title_of_eom;
blackHeader.innerHTML = title_of_eom;