document.querySelector('.hamburger').addEventListener('click', showDropdown);
document.querySelector('.close-dropdown').addEventListener('click', hideDropdown);
document.querySelector('.backdrop').addEventListener('click', hideDropdown);

function showDropdown() {
    document.querySelector('.dropdown-menu').style.transform = 'translateY(0)';
    document.querySelector('.backdrop').style.display = 'block';
}

function hideDropdown() {
    document.querySelector('.dropdown-menu').style.transform = 'translateY(-100vh)';
    document.querySelector('.backdrop').style.display = 'none';
}

console.log('Hey from main.js');