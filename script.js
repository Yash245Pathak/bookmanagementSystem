import {
  get,
  getDatabase,
  ref,
  set,
  update,
  remove,
  child,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";

var titleV, authV, langV, subV;

const db = getDatabase();

var TitleBox = document.getElementById("titleBox");
var AuthBox = document.getElementById("authBox");
var LangBox = document.getElementById("langBox");
var SubBox = document.getElementById("subBox");

function readFormData() {
  titleV = TitleBox.value;
  authV = AuthBox.value;
  langV = LangBox.value;
  subV = SubBox.value;
  console.log(titleV, authV, langV, subV);
}
function clearFormData() {
  TitleBox.value = "";
  AuthBox.value = "";
  LangBox.value = "";
  SubBox.value = "";
}

function insertData(e) {
  e.preventDefault();
  readFormData();
  //code to send data to firebase
  set(ref(db, "data/" + titleV), {
    title: titleV,
    author: authV,
    language: langV,
    subject: subV,
  })
    .then(() => {
      alert("Data stored!");
    })
    .catch((error) => {
      alert("Unsuccessful", error);
    });

  clearFormData();
}
function readData(e) {
  e.preventDefault();
  readFormData();
  const dbref = ref(db);
  get(child(dbref, "data/" + titleV))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // TitleBox.value = snapshot.val().title;
        AuthBox.value = snapshot.val().author;
        LangBox.value = snapshot.val().language;
        SubBox.value = snapshot.val().subject;
      } else {
        alert("No data found!");
      }
    })
    .catch((error) => {
      alert("Unsuccessful", error);
    });
}
function updateData(e) {
  e.preventDefault();
  readFormData();
  update(ref(db, "data/" + titleV), {
    // rollno: rollV,
    author: authV,
    language: langV,
    subject: subV,
  })
    .then(() => {
      alert("Data updated!");
    })
    .catch((error) => {
      alert("Unsuccessful", error);
    });
  clearFormData();
}
function deleteData(e) {
  e.preventDefault();
  readFormData();
  if (confirm("Are you sure to delete this?")) {
    remove(ref(db, "data/" + titleV))
      .then(() => {
        alert("Data Deleted!");
      })
      .catch((error) => {
        alert("Unsuccessful", error);
      });
  }
  clearFormData();
}

document.getElementById("btn1").onclick = insertData;
document.getElementById("btn2").onclick = readData;
document.getElementById("btn3").onclick = updateData;
document.getElementById("btn4").onclick = deleteData;
