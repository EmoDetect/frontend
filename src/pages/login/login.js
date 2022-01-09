import firebase from "firebase/app";
import "firebase/auth";
import "initApp"
import db from "database"

const user = localStorage.getItem('user');

const createNewAccountButton = document.querySelector('#new-account');

createNewAccountButton.addEventListener('click', showRegisterForm);

function showRegisterForm(event) {
    event.stopPropagation();
    event.preventDefault();

    const loginForm = document.getElementById('login-div');
    const registerForm = document.getElementById('register-div');

    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
};

if (user === 'educator') {
    const registerForm = document.getElementById('register-div');
    const newAccountButton = document.getElementById('new-account');

    const orText = document.getElementById('display-or-text');

    orText.style.display = 'none';
    registerForm.style.display = 'none';
    newAccountButton.style.display = 'none';
} else {
    const registerForm = document.getElementById('register-div');

    registerForm.style.display = 'none';

    const newAccountButton = document.getElementById('new-account');
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("User", user);
        //User is signed in.
        db.collection('users')
            .doc(user.uid)
            .get()
            .then((doc) => {
                console.log("DOC DATA", doc.data());
                if (doc.data().role === 'kid') {
                    window.location.href =
                        '/pages/activities-list/activities.html';
                } else {
                    window.location.href =
                        '/pages/educator-dashboard/educator-dashboard.html';
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', login)

function login(event) {
    event.stopPropagation();
    event.preventDefault();

    const userEmail = document.getElementById('email_field').value;
    const userPass = document.getElementById('password_field').value;

    console.log("Inside Login");

    firebase
        .auth()
        .signInWithEmailAndPassword(userEmail, userPass)
        .catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error(error);
        });

    return;
}

function logout() {
    firebase.auth().signOut();
}

// register
const registerBtn = document.getElementById('register_button');

registerBtn.addEventListener('click', (event) => {
    event.preventDefault();

    // get user info
    const email = document.getElementById('email_field_register').value;
    const password = document.getElementById('password_field_register').value;

    // sign up the user & add firestore data
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((cred) => {
            return db.collection('users').doc(cred.user.uid).set({
                role: 'kid'
            });
        })
        .then(() => {
            window.location.href = '/pages/activities-list/activities.html';
        });
});

// login with enter
const passwordInput = document.getElementById('password_field');
passwordInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('login-button').click();
    }
});
