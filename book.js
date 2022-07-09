import {
    get,
    getDatabase,
    ref,
    child,
  } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
  
  const db = getDatabase();
  
  //function to get all data from firebase
  function getAllUserData() {
    const dbref = ref(db);
  
    get(child(dbref, "data/")).then((snapshot) => {
      var books = [];
      snapshot.forEach((childSnapshot) => {
        books.push(childSnapshot.val());
      });
      displayData(books);
    });
  }
  
  //refernce and display data
  var stdNo = 0;
  var tbody = document.getElementById("tbody");
  function displayData(bookData) {
    stdNo = 0;
    tbody.innerHTML = "";
    bookData.forEach(books=>{
      let tr = document.createElement("tr");
  
      let td1 = document.createElement("td");
      let td2= document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let td5 = document.createElement("td");
  
      td1.innerHTML = ++stdNo;
      td2.innerHTML = books.title;
      td3.innerHTML = books.author;
      td4.innerHTML = books.language;
      td5.innerHTML = books.subject;
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
  
  
      tbody.appendChild(tr);
    })
  }
  
  window.onload = getAllUserData;
  