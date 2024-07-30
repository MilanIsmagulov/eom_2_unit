// Access answers array from the data object
const anwserArr = data[`index_${currentPageIndex}`].test.find(item => item.answers).answers;
answerButton.classList.remove('gray_dis');
answerButton.disabled = false;
const dynamicContainer = document.createElement('div');
dynamicContainer.className = 'dynamic-content';
const dragObj = document.createElement('div');
dragObj.className = 'numbers';
contentDiv.appendChild(dynamicContainer)
dynamicContainer.appendChild(dragObj)
localStorage.removeItem('data1')

const list = document.createElement('ul');
list.className = 'list'
list.id = 'list';
dynamicContainer.appendChild(list)

let storeItems = [];
let listItems = [];
let dragStartIndex;

init();

function init() {
    localStorage.getItem('data1') ? loadList() : createList();
}

function createList() {
    [...anwserArr]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('id', index);
        listItem.innerHTML = `<div class="item" draggable="true">${item}</div>`;

        var num = document.createElement('span');
        num.setAttribute('class', 'number');
        num.innerHTML = `${index+1}`;
        document.getElementsByClassName("numbers")[0].appendChild(num);

        listItems.push(listItem);
        list.appendChild(listItem);
    });


    for (i in listItems) {
        storeItems.push(i);
    }

    localStorage.setItem('data1', JSON.stringify(storeItems));

    // addEventListeners();
}


function loadList() {
    fromStore();

    [...storeItems]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('id', index);
        listItem.innerHTML = `<span class="number">${index + 1}</span><div class="item" draggable="true">${item}</div>`;
        listItems.push(listItem);
        list.appendChild(listItem);
    });

    [...storeItems]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('id', index);
        listItem.innerHTML = `<span class="number">${index + 1}</span><div class="item" draggable="true">${item}</div>`;
        listItems.push(listItem);
        list.appendChild(listItem);
    });
    // addEventListeners()
}


function toStore() {
    localStorage.setItem('data1', JSON.stringify(storeItems));
}


function fromStore() {
    storeItems = JSON.parse(localStorage.getItem('data1'));
}


function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('id');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('id');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}


function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.item');
    const itemTwo = listItems[toIndex].querySelector('.item');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);

    storeItems = []
    for (i of listItems) {
        
        storeItems.push(i.children[1].innerText);
    }
    localStorage.setItem('data1', JSON.stringify(storeItems));
}

function getCurrentList() {
    
}


function checkAnwser() {
    listItems = document.getElementsByClassName("list");
    let i = 0;

    for (item of listItems[0].children){
        itemText = item.getElementsByTagName('div')[0].innerText;
        let index = i;

        if (itemText !== anwserArr[index]) {
            item.classList.add('incorrect')
            localStorage.setItem('answer_' + `index_${currentPageIndex}`, JSON.stringify({questionPlace: false}));

        } else {
            localStorage.setItem('answer_' + `index_${currentPageIndex}`, JSON.stringify({questionPlace: true}));
            item.classList.remove('incorrect')
            item.classList.add('correct')

        }
        i++;
    }
}

var el = document.getElementById('list');

var sortable = new Sortable(el, {
    swap: true,
    swapClass: "highlight",
    animation: 150,
});