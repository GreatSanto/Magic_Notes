console.log("Welcome to notes app. This is index.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  if (addTxt.value.length == 0){
    show('Failure', 'Please add some text to add.');
  }
  else{
  notesObj.push(myObj);
  show('success', 'Your note has been successfully added');
}
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body" id="card-area">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary delBtn">Delete Note</button>
                        <button class="btn btn-primary impBtn" id="impBtn${index}" onclick="markImportant(this.id)" ondblclick="unMarkImportant(this.id)"><span id="marking${index}">Mark It</span></button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardTit = element.getElementsByTagName("h5")[0].innerText;
        if(cardTxt.includes(inputVal) || cardTit.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})
function markImportant(index) {
    var y = document.getElementById(index);
    var x = document.getElementById(index).parentElement;
    x.style.setProperty("background-color", "#FF5757", "important");
    document.getElementById(index).innerHTML = "UnMark";
}
function unMarkImportant(index) {
    var y = document.getElementById(index);
    var x = document.getElementById(index).parentElement;
    x.style.setProperty("background-color", "#fff");
    document.getElementById(index).innerHTML = "Mark It";
}

function show(type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<span class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Messge:</strong> ${displayMessage}
                        </span>`;
    setTimeout(function () {
        message.innerHTML = ''
    }, 2000);

}