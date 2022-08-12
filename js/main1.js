let lang = 1;
let arr = arr1;
let answer = "";
let number = 0;
let listWords = words;
let count = words.length;
let countCorrect = 0;
let y = null;
let parsedY = null;
let res = null;
let type = '';
let fieldmc = document.querySelector('.field-mc');
let filteredArr = [];
countAnswers();
shuffle(words);
makeList();
setWord();
document.querySelector("#count").innerHTML = count;

//shuffle the arr1ay so the word appear random
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

//count number of correct answerd questions
function countAnswers () {
  document.querySelector("#countcorrect").innerHTML = countCorrect;
  countCorrect++
}
//set all words in modal
function makeList () {
  let text = "";
  arr.forEach (function(value, key) {
    text += value + ' - ' + key + "<br>"
  })
  document.querySelector("#allwords").innerHTML = text;
}

function clear () {
    countCorrect = 0;
    countCorrect = 0;
    number = 0;
    filteredArr = [];
    document.querySelector("#solution").innerHTML = "";
    document.querySelector(".succes").innerHTML = "";
    countAnswers();
    shuffle(words);
    shuffle(words2);
    makeList();
    setWord();
}

// Switch which languege is shown
function setReverse () {
  if (listWords == words) {
    clear ();
    filteredArr = words;
    listWords = words2;
    arr = arr2;
    lang = 1;
    makeList();
    setWord();
  }
  else {
    clear ();
    lang = 2;
    filteredArr = words2;
    listWords = words;
    arr = arr1;
    makeList();
    setWord();
  }
}

// Selecting the input element and get its value
function getInputValue(){
    answer = document.querySelector('#text').value.toLowerCase();
    res = arr.get(answer);
    y = getByValue(arr, listWords[number]);
    parsedY = y.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    compareAnswer(number, res, answer, y, parsedY);
}

// show the next word which has to be translated
function setWord() {
    document.getElementById('text').value = '';
  document.querySelector("#solution").innerHTML = "";
  if  (listWords[number] == undefined ) {
    number--;
  }
  if (listWords.length == 0 ) {
    document.querySelector("#word").innerHTML ="Alles goed!";
  }
  else {
    document.querySelector("#word").innerHTML = listWords[number];
    setMultipleChoice('run');
  }
}

// do stuff when answer is correct
function addSucces(currentWord, y, index) {

  // add one to correct answer count
  countAnswers();

  // add correct answered word to list
  var newItem = document.createElement("LI");
  let html = currentWord + ' - ' + y;
  var textnode = document.createTextNode(html);
  newItem.appendChild(textnode);
  let list = document.querySelector('.succes');

  list.insertBefore(newItem, list.childNodes[0]);

  // remove correct answered word from arr1ay
  listWords.splice(index, 1);
  setWord();
}

// do stuff when answer is incorrects
function displaySuccess(currentWord, y) {

  if (type == "multiplechoice")  {
    fieldmc.classList.add('opacity-25', 'bg-danger-light');
    setTimeout(function() {fieldmc.classList.remove('opacity-25',  'bg-danger-light');}, 500);
    return null;
  }
  let button = document.querySelector(".btn-success");
  let classes = button.classList;
  classes.add("btn-danger");
  document.querySelector('.btn-modal').click();
  document.querySelector('.modal-solution').innerHTML = currentWord;
  document.querySelector('.modal-body').innerHTML = y;
  document.querySelector('.myanswer').innerHTML = answer;
  setTimeout(function() {classes.remove("btn-danger")}, 300);

  number++;
  setWord();
}

//compare the given answer with the solution
function compareAnswer(index, res, answer, y, parsedY)  {

  let currentWord = listWords[index];
  let checkBox = document.getElementById("myCheck");

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

}

//show the solution if clicked on button
function showSolution() {
 var x = (getByValue(arr, listWords[number]));

  document.querySelector("#solution").innerHTML = x;
  document.getElementById("text").focus();
}

//get the key with the value
function getByValue(arr, searchValue) {
  for (let [key, value] of arr.entries()) {
    if (value === searchValue)
      return key;
  }
}

// set the right answer if clicked on button
function wrongRight () {
  answer = parsedY;
  number--
  compareAnswer(number, res, answer, y, parsedY);
   document.querySelector(".btn-close-wr").click();
}

// Set keyboard keys
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


var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


// multiple choice

function showField () {
  let fieldinput = document.querySelector('.field-input');

  if (fieldmc.classList.contains('d-none') ) {
    fieldmc.classList.remove('d-none');
    fieldinput.classList.add('d-none');
    type = 'multiplechoice';
  }

  else {
    fieldmc.classList.add('d-none');
    fieldinput.classList.remove('d-none');
    type = null;
    return null;
  }
  setMultipleChoice();

}

function setMultipleChoice(x) {
  console.log(x);
  let correctAnswer = getByValue(arr, listWords[number]);
  let random = [];
  let listmc = words2;
  if ( filteredArr.length < 3 || x !='run' ) {

    if (lang === 1 && filteredArr.length < 3) {
      listmc = words
    }
    if (lang === 2 && filteredArr.length < 3)  {
      listmc = words2
    }

    random.push(correctAnswer);
    filteredArr = listmc.filter(e => e !== correctAnswer);
    random.push(filteredArr[Math.random() * filteredArr.length | 0]);
    filteredArr = filteredArr.filter(e => e !== random[1]);
    random.push(filteredArr[Math.random() * filteredArr.length | 0]);
  }
  else {
    // let correctAnswer = getByValue(arr, listWords[number]);
    random.push(correctAnswer);
    if (x != 'run' ) {
      filteredArr = listmc.filter(e => e !== correctAnswer);
    }
    else {
      filteredArr = filteredArr.filter(e => e !== correctAnswer);
    }

    random.push(filteredArr[Math.random() * filteredArr.length | 0]);
    filteredArr = filteredArr.filter(e => e !== random[1]);
    random.push(filteredArr[Math.random() * filteredArr.length | 0]);
    }
    console.log(filteredArr);

    random = shuffle(random);
    for (let i = 0; i < random.length; i++) {
      document.querySelectorAll(".multiplechoice")[i].innerHTML = random[i];
      document.querySelectorAll(".multiplechoice")[i].setAttribute("onclick", 'multipleChoiceAnswer("' + random[i] + '")');

  }

}

function multipleChoiceAnswer(a) {

  var answer = a;
  res = arr.get(answer);
  y = getByValue(arr, listWords[number]);
  parsedY = y.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  compareAnswer(number, res, answer, y, parsedY);
}

function addslashes( str ) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
