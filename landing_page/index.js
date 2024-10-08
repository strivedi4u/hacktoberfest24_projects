document.querySelector('.menu-toggle').addEventListener('click', function () {
    this.classList.toggle('active');
    document.querySelector('nav ul').classList.toggle('nav-active');
});
