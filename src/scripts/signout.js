import firebase from "firebase/app";
import "firebase/auth";

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => console.log("signed out"))
    .catch((error) => console.log(error));
}

export default () => {
  document.getElementById("signout").addEventListener("click", signOut);
};
