import firebase from "firebase/app";
import "firebase/auth";

firebase.auth().onAuthStateChanged(
  function (user) {
    if (user) {
      console.log(user);
      // User is signed in.
    } else {
      window.location.assign("/pages/login/login.html");
    }
  },
  function (error) {
    console.log(error);
  }
);
