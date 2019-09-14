// Creating New Entry
function createEntry() {
    if (DOMstrings.entryTitle.value !== '' && DOMstrings.entryField.value !== '') {
        let storage = JSON.parse(localStorage.getItem('entries'));

        const title = DOMstrings.entryTitle.value;
        const entryText = DOMstrings.entryField.value;
        const entryDate = `${currentDay}. ${currentDate}/${currentMonth + 1}/${currentYear}`;

        // id: storage.length === null ? 0 : storage.length
        const entryObj = {
            title,
            entryText,
            entryDate,
            id: storage.length
        };

        //entryObj.id = storage.length === null ? 0 : storage.length;

        storage.push(entryObj);

        // Add to LS
        localStorage.setItem('entries', JSON.stringify(storage));

        // Display from LS
        //const storage = JSON.parse(localStorage.getItem('entries'));
        console.log(`Local Storage retrieved: ${storage}`);

        // const storageIndex = storage.findIndex(e => e == entryObj);
        // console.log(`storageIndex: ${storageIndex}`);

        const objIndex = entryObj.id;


        const markup = `
        <li class="dashboard__entries-item" id="${storage[objIndex].id}"><p class="dashboard__entries-item--title">${storage[objIndex].title}</p>
        <div class="date">
            <img src="img/calendar-solid.svg" alt="Calendar Icon" class="icon-calendar"> <p class="dashboard__entries-item--date">${storage[objIndex].entryDate}</p>
        </div>
        </li>
        `;

        DOMstrings.entries.insertAdjacentHTML('afterbegin', markup);

        console.log(storage);

        DOMstrings.entryTitle.value = '';
        DOMstrings.entryField.value = '';

        DOMstrings.displayBox.style.visibility = 'visible';
        DOMstrings.displayBox.firstElementChild.textContent = 'Entry Created!';

        setTimeout(function () {
            DOMstrings.displayBox.style.visibility = 'hidden';
        }, 1500);


    }

    document.querySelector('.dashboard__entrymenu-item').addEventListener('click', function (e) {
        console.log('You pressed the new entry-btn');
        DOMstrings.entryTitle.value = '';
        DOMstrings.entryField.value = '';
        DOMstrings.saveBtn.style.display = 'inline-block';
        DOMstrings.saveBtn.textContent = 'Save Now';
        DOMstrings.updateBtn.style.display = 'none';
    });
}


// Reading New Entry
function readEntry(e) {
    DOMstrings.saveBtn.style.display = 'none';
    DOMstrings.updateBtn.style.display = 'inline-block';
    const targeted = e.target.closest('.dashboard__entries-item');
    let retrievedStorage = JSON.parse(localStorage.getItem('entries'));
    console.log(`This is the retrieved Storage: ${retrievedStorage}`);
    const targetIndex = retrievedStorage.findIndex(e => e.id == targeted.id); // note: targetIndex is a number
    console.log(targetIndex);

    /* You have to find the index of the item. YOu can't read it from the targetIndex. Because, in our case:,
    the id is 2, whereas the index inside of the retrievedStorage-array is 0. So, you have to find the index:
    */

    DOMstrings.entryTitle.value = retrievedStorage[targetIndex].title;
    DOMstrings.entryField.value = retrievedStorage[targetIndex].entryText;
    DOMstrings.currentDate.textContent = retrievedStorage[targetIndex].entryDate;
    DOMstrings.saveBtn.textContent = 'Update Now';

    // Updating Entry

    DOMstrings.updateBtn.addEventListener('click', function (e) {
        console.log(`This is the saved event ID: ${targetIndex}`);
        console.log(`This is the targeted id: ${targeted.id}. Its type is: ${typeof targeted.id}`);

        // Update in the data
        storage[targetIndex].title = DOMstrings.entryTitle.value;
        storage[targetIndex].entryText = DOMstrings.entryField.value;

        // Update in the LS
        localStorage.setItem('entries', JSON.stringify(storage));



        document.getElementById(targeted.id).firstElementChild.textContent = DOMstrings.entryTitle.value;

        DOMstrings.displayBox.style.visibility = 'visible';
        DOMstrings.displayBox.firstElementChild.textContent = 'Entry Updated!';

        setTimeout(function () {
            DOMstrings.displayBox.style.visibility = 'hidden';
        }, 1500);



    });

    // Deleting Entry
    document.querySelector('.delete-btn').addEventListener('click', function (e) {

        // Handle case of empty entries
        if (DOMstrings.entryTitle.value === '' || DOMstrings.entryTitle.value === '') {
            // Display Box:
            DOMstrings.displayBox.style.visibility = 'visible';
            DOMstrings.displayBox.firstElementChild.textContent = 'Empty Inputs!';
            DOMstrings.displayBox.firstElementChild.style.color = '#F04126';

            setTimeout(function () {
                DOMstrings.displayBox.style.visibility = 'hidden';
            }, 1500);
        } else {
            //Delete from storage variable
            let retrievedStorage = JSON.parse(localStorage.getItem('entries'));

            // You have to hunt that ID, your starting point (Target) is the remove-btn...
            let entryListArr = Array.from(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.children);

            let entryID;
            // Loop through the children of the list and then check it with targeted.id with element.children
            entryListArr.forEach((entry, index) => {
                console.log(entry.id);
                // Check if IDs are matching (inside of loop)

                if (entry.id === targeted.id) {
                    // Save ID
                    entryID = entry.id;
                    console.log(entryID + 'this is the entryID');

                    // You can maybe remove the UI here
                    entry.remove();

                }
            });

            retrievedStorage.forEach((obj, index) => {
                if (obj.id == targeted.id) {
                    retrievedStorage.splice(index, 1);
                }
            });


            localStorage.setItem('entries', JSON.stringify(retrievedStorage));
            DOMstrings.entryTitle.value = '';
            DOMstrings.entryField.value = '';


            // Display Box:
            DOMstrings.displayBox.style.visibility = 'visible';
            DOMstrings.displayBox.firstElementChild.textContent = 'Entry Deleted!';
            DOMstrings.displayBox.firstElementChild.style.color = '#F04126';

            setTimeout(function () {
                DOMstrings.displayBox.style.visibility = 'hidden';
            }, 1500);

        }


    });


    document.querySelector('.dashboard__entrymenu-item').addEventListener('click', function (e) {
        console.log('You pressed the new entry-btn');
        DOMstrings.entryTitle.value = '';
        DOMstrings.entryField.value = '';
        DOMstrings.saveBtn.style.display = 'inline-block';
        DOMstrings.saveBtn.textContent = 'Save Now';
        DOMstrings.updateBtn.style.display = 'none';
    });
}