
let answer = "";
let number = 0;
let listWords = words;
let arr = arr1;
let count = words.length;
let countCorrect = 0;
let y = null;
let parsedY = null;
let res = null;
countAnswers();
shuffle(words);
makeList();
setWord();
//
// let parsedArr = arr.map((element) => element.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
// console.log(parsedArr);
function setReverse () {
  if (listWords == words) {
    listWords = words2;
    arr = arr2;
    makeList();
    setWord();
    document.querySelector("#solution").innerHTML = "";
  }
  else {
    listWords = words;
    arr = arr1;
    makeList();
    setWord();
    document.querySelector("#solution").innerHTML = "";
  }
}
function countAnswers () {
  document.querySelector("#countcorrect").innerHTML = countCorrect;
  countCorrect++
}

function getInputValue(){
    // Selecting the input element and get its value

    document.querySelector("#solution").innerHTML = "";
    answer = document.querySelector('#text').value.toLowerCase();
    res = arr.get(answer);
    y = getByValue(arr, listWords[number]);
    parsedY = y.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    compareAnswer(number, res, answer, y, parsedY);
}

function setWord() {
  document.querySelector("#count").innerHTML = count;
  if  (listWords[number] == undefined ) {
    number--;
  }
  if (listWords.length == 0 ) {
    document.querySelector("#word").innerHTML ="Alles goed!";
  }
  else {
    document.querySelector("#word").innerHTML = listWords[number];
  }
}

function addSucces(currentWord, y, index) {

  countAnswers();

  var newItem = document.createElement("LI");
  let html = currentWord + ' - ' + y;
  var textnode = document.createTextNode(html);
  newItem.appendChild(textnode);
  let list = document.querySelector('.succes');

  list.insertBefore(newItem, list.childNodes[0]);

  // remove word from array
  listWords.splice(index, 1);
}
function displaySuccess(currentWord, y) {
  let button = document.querySelector(".btn-success");
  let classes = button.classList;
  classes.add("btn-danger");
  document.querySelector('.btn-modal').click();
  document.querySelector('.modal-solution').innerHTML = currentWord;
  document.querySelector('.modal-body').innerHTML = y;
  document.querySelector('.myanswer').innerHTML = answer;
  setTimeout(function() {classes.remove("btn-danger")}, 300);

  number++;

}

function compareAnswer(index, res, answer, y, parsedY)  {

  let currentWord = listWords[index];
  let checkBox = document.getElementById("myCheck");
  console.log(answer, y, parsedY)

// If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    if (answer === y) {
      addSucces(currentWord, y, index);
    }
    if (index < listWords.length && answer != y) {
      displaySuccess(currentWord, y);
    }
    if (number === listWords.length && answer != y ) {
      shuffle(listWords)
      number = 0;
    }
  }
  else {
    if (answer === y || answer === parsedY ) {
      addSucces(currentWord, y, index);
    }
    if (index < listWords.length && answer != y && answer != parsedY) {
      displaySuccess(currentWord, y);
    }
    if (number === listWords.length && answer != y && answer != parsedY) {
      shuffle(listWords)
      number = 0;
    }
  }


  document.getElementById('text').value = '';
  setWord();
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function showSolution() {
 var x = (getByValue(arr, listWords[number]));

  document.querySelector("#solution").innerHTML = x;
  document.getElementById("text").focus();
}

function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue)
      return key;
  }
}

function wrongRight () {
  answer = parsedY;
  number--
  compareAnswer(number, res, answer, y, parsedY);
   document.querySelector(".btn-close").click();
}

// Get the input field
var input = document.querySelector("#text");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector("#send").click();
  }
});

document.querySelector(".btn-close").addEventListener("click", function() {
  document.getElementById("text").focus();
});

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {//27 is the code for escape
        document.getElementById("text").focus();
    }
  }

function makeList () {
  let text = "";
    arr.forEach (function(value, key) {
      text += value + ' - ' + key + "<br>"
    })
    document.querySelector("#allwords").innerHTML = text;
  }
