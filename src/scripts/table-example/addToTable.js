import firebase from "firebase/app";
import db from "database";

function addItem(event) {
  event.preventDefault();
  event.stopPropagation();

  const collectionRef = db.collection("EXAMPLE_COLLECTION");
  const form = document.querySelector(".add-new-items-form");
  const newDocument = {
    title: form.querySelector(".item-title").value,
    value: form.querySelector(".item-value").value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  collectionRef
    .add(newDocument)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      form.reset();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

export default () => {
  document.querySelector(".add-new-item").addEventListener("click", addItem);
};
