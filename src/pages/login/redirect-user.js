const educatorClicked = document.querySelector('.educator').className;
const childClicked = document.querySelector('.child').className;

console.log("FIRST SCRIPT");

document.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.className === educatorClicked) {
        localStorage.setItem('user', 'educator');

        window.location.href = '/pages/login/login.html';
    } else if (e.target.className === childClicked) {
        localStorage.setItem('user', 'kid');

        window.location.href = '/pages/login/login.html';
    }
});
