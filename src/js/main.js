document.querySelector('.hamburger').addEventListener('click', showDropdown);
document.querySelector('.close-dropdown').addEventListener('click', hideDropdown);
document.querySelector('.backdrop').addEventListener('click', hideDropdown);

const showDropdown = () => {
    document.querySelector('.dropdown-menu').style.transform = 'translateY(0)';
    document.querySelector('.backdrop').style.display = 'block';
}

const hideDropdown = () => {
    document.querySelector('.dropdown-menu').style.transform = 'translateY(-100vh)';
    document.querySelector('.backdrop').style.display = 'none';
}

