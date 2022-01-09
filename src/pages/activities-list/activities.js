import firebase from "firebase/app";
import "firebase/auth";
import "initApp"
import "auth"

const logout = document.getElementById('nav-logout-games');
logout.addEventListener('click', () => {
    console.log('try to logout...');
    firebase.auth().signOut();
    window.location.href = '/pages/login/login.html';
});