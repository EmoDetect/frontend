import db from "database";

const collectionRef = db.collection("EXAMPLE_COLLECTION");
const container = document.querySelector(".example-table tbody");

function deleteItem(event) {
  const element = event.target;
  const itemId = element.getAttribute("data-id");

  collectionRef
    .doc(itemId)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.log("Error removing document: ", error);
    });
}

export default () => {
  collectionRef.orderBy("createdAt").onSnapshot((querySnapshot) => {
    container.innerHTML = "";

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    data.forEach((dataset, index) => {
      const row = document.createElement("tr");
      const indexCell = `<td>${index + 1}</td>`;
      const titleCell = `<td>${dataset.title}</td>`;
      const valueCell = `<td>${dataset.value}</td>`;
      const deleteBtn = `<td>
                            <button class="delete-item button-error pure-button"
                                data-id="${dataset.id}"
                                type="button">
                                Delete
                            </button>
                        </td>`;

      row.innerHTML = indexCell + titleCell + valueCell + deleteBtn;
      container.append(row);
    });

    container
      .querySelectorAll(".delete-item")
      .forEach((btn) => btn.addEventListener("click", deleteItem));
  });
};
