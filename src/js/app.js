const DOMstrings = {
    entries: document.querySelector('.dashboard__entries'),
    entryItems: document.querySelector('.dashboard__entries-item'),
    currentDate: document.querySelector('.entryarea__box-date--currentdate'),
    entryTitle: document.querySelector('.entryarea__box-title'),
    entryField: document.querySelector('.entryarea__box-entryfield'),
    saveBtn: document.querySelector('.entryarea__box-savebtn'),
    updateBtn: document.querySelector('.entryarea__box-updatebtn'),
    displayBox: document.querySelector('.display-message')
}

const data = [];
let storage = JSON.parse(localStorage.getItem('entries'));
if (storage) {
    storage = JSON.parse(localStorage.getItem('entries'));
} else {
    storage = [];
}

// Making Date Dynamic
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const currentDay = days[new Date().getDay()];
const currentYear = new Date().getFullYear();
const currentDate = new Date().getDate();
const currentMonth = new Date().getMonth();

// Clearing Entries
document.addEventListener('DOMContentLoaded', loadPage);
DOMstrings.saveBtn.addEventListener('click', createEntry);
//Make the read entry a dbl-click event
DOMstrings.entries.addEventListener('click', readEntry);
//console.log(`This is the saved event ID: ${eventID}`);
//DOMstrings.updateBtn.addEventListener('click', updateEntry);



function loadPage() {
    localStorage.setItem('entries', JSON.stringify(storage));
    console.log(`Initial storage: ${storage}`);

    DOMstrings.updateBtn.style.display = 'none';

    // Clear entries
    // while (DOMstrings.entries.firstChild) {
    //     DOMstrings.entries.firstChild.remove();
    // }


    if (storage) {
        storage.forEach((element, index) => {
            const markup = `
            <li class="dashboard__entries-item" id="${storage[index].id}"><p class="dashboard__entries-item--title">${storage[index].title}</p>
            <div class="date">
                <img src="img/calendar-solid.svg" alt="Calendar Icon" class="icon-calendar"> <p class="dashboard__entries-item--date">${storage[index].entryDate}</p>
            </div>
            </li>
            `;

            DOMstrings.entries.insertAdjacentHTML('afterbegin', markup);
        });

    }

    // Setting current date
    // Sun. 8/5/2018
    DOMstrings.currentDate.textContent = `${currentDay}. ${currentDate}/${currentMonth + 1}/${currentYear}`;

    DOMstrings.displayBox.style.visibility = 'hidden';
}