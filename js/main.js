let lang = 1;
let reverse = 0;
let arr = arr1;
let answer = "";
let key = null;
let escape = null;
let wrongClicked = 0;
let number = 0;
let currentWord = null;
let correctAnswer = null;
let listWords = words;
let count = Object.keys(arr3).length;
const completeCount = count;
let countCorrect = 0;
let y = null;
let parsedY = null;
let res = null;
let voice = 0;
let type = '';
let voicewr = 0;
let fieldmc = document.querySelector('.field-mc');
let filteredArr = [];
var random = Math.floor(Math.random() * (count));
var copyArr = clone(arr3);
   function clone(obj) {
       if (null == obj || "object" != typeof obj) return obj;
       var copy = obj.constructor();
       for (var attr in obj) {
           if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
       }
       return copy;
   }

document.querySelector("#countcorrect").innerHTML = countCorrect;
makeList();
setWord();

document.querySelector("#count").innerHTML = count;

// console.log(Object.values(arr3)[random]);

// show the next word which has to be translated
function setWord() {
  escape = null;
  if (wrongClicked === 0 ) {
    random = Math.floor(Math.random() * (count));
  }
  else {
    wrongClicked = 0;
  }

  if (reverse === 0 ) {
    currentWord = Object.keys(arr3)[random];
  }
  else {
    currentWord = Object.values(arr3)[random];
  }


  if (countCorrect === completeCount) {
    document.querySelector("#text").classList.add("d-none");
    document.querySelector(".field-mc").classList.add("d-none");
    document.querySelector(".field-mc").classList.remove("field-mc");
    fieldmc = null;
    currentWord = "gefeliciteerd alles goed!";
  }
  document.getElementById('text').value = "";
  document.querySelector("#solution").innerHTML = "";
  // if  (listWords[number] == undefined ) {
  //   number--;
  // }
  // if (listWords.length == 0 ) {
  //   document.querySelector("#word").innerHTML ="Alles goed!";
  // }
  // else {
    document.querySelector("#word").innerHTML = currentWord;

    if (voice === 1 ) {

      speak(currentWord);
    }
  // }
  setMultipleChoice('run');
}

// Selecting the input element and get its value
function getInputValue(){
    answer = document.querySelector('#text').value.toLowerCase();
    compareAnswer(answer);
}

function compareAnswer(answer)  {
  key = Object.keys(arr3)[random];
  if (reverse === 0 ) {
    correctAnswer = Object.values(arr3)[random].toLowerCase();
  }
  else {
    correctAnswer = Object.keys(arr3)[random].toLowerCase();
  }

  parsedCorrectAnswer = correctAnswer.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  let checkBox = document.getElementById("myCheck");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true) {
    if (answer === correctAnswer ) {
      addSucces(correctAnswer);
    }
    if (answer != correctAnswer) {
      displaySuccess(correctAnswer);
    }
    // if (number === listWords.length && answer != y ) {
    //   // shuffle(listWords)
    //   number = 0;
    // }
  }
  else {
    if (answer === correctAnswer || answer === parsedCorrectAnswer ) {
      addSucces(correctAnswer);
    }
    if (answer != correctAnswer || answer != parsedCorrectAnswer) {
      displaySuccess(correctAnswer);
    }
    // if (number === listWords.length && answer != y && answer != parsedCorrectAnswer) {
    //   // shuffle(listWords)
    //   number = 0;
    // }
  }

}

// do stuff when answer is correct
function addSucces(correctAnswer) {

  // add one to correct answer count
  countAnswers();
  // add correct answered word to list
  var newItem = document.createElement("LI");
  let html = correctAnswer + ' - ' + currentWord;
  var textnode = document.createTextNode(html);
  newItem.appendChild(textnode);
  let list = document.querySelector('.succes');

  list.insertBefore(newItem, list.childNodes[0]);

  // remove correct answered word from array
  delete arr3[key];
  count = Object.keys(arr3).length;
  setWord();
}

//count number of correct answerd questions
function countAnswers () {
  countCorrect++
  document.querySelector("#countcorrect").innerHTML = countCorrect;
}

function clear () {
    countCorrect = 0;
    countCorrect = 0;
    number = 0;
    filteredArr = [];
    document.querySelector("#solution").innerHTML = "";
    document.querySelector(".succes").innerHTML = "";
    countAnswers();
    // shuffle(words);
    // shuffle(words2);
    // makeList();
    setWord();
}

// Switch which languege is shown
function setReverse () {
  if (reverse === 0) {

    reverse = 1;
    // clear ();
    // filteredArr = words;
    // listWords = words2;
    // arr = arr2;
    // lang = 1;
    // makeList();
    setWord();
  }
  else {
    reverse = 0;
    // clear ();
    // lang = 2;
    // filteredArr = words2;
    // listWords = words;
    // arr = arr1;
    // makeList();
    setWord();
  }
}

function setVoice () {
  if (voice === 0) {
    voice = 1;
  }
  else {
    voice = 0;
  }
}




// do stuff when answer is incorrect
function displaySuccess(correctAnswer) {

  if (type == "multiplechoice")  {
    fieldmc.classList.add('opacity-25', 'bg-danger-light');
    setTimeout(function() {fieldmc.classList.remove('opacity-25',  'bg-danger-light');}, 500);
    return null;
  }
  escape = 1;
  let button = document.querySelector(".btn-success");
  let classes = button.classList;
  classes.add("btn-danger");
  document.querySelector('.btn-modal').click();
  document.querySelector('.modal-solution').innerHTML = currentWord;
  document.querySelector('.modal-body').innerHTML = correctAnswer;
  document.querySelector('.myanswer').innerHTML = answer;
  setTimeout(function() {classes.remove("btn-danger")}, 300);

  // setWord();
}

//compare the given answer with the solution

//show the solution if clicked on button
function showSolution() {

  if (reverse === 0 ) {
    correctAnswer = Object.values(arr3)[random];
  }
  else {
    correctAnswer = Object.keys(arr3)[random];
  }

  document.querySelector("#solution").innerHTML = correctAnswer;
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
  wrongClicked = 1;
  voicewr = 1;
  answer = correctAnswer;
  compareAnswer(answer, wrongClicked);
  document.querySelector(".btn-close-wr").click();
  voicewr = 0;
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

document.querySelector(".btn-close-wr").addEventListener("click", function() {
  document.getElementById("text").focus();

  if (voicewr == 0 ) {
    setWord();
  }
});

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {//27 is the code for escape
        document.getElementById("text").focus();
  
        if (escape === 1) {
          document.querySelector(".btn-close-wr").click();
        }

    }
  }


// var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
//
// var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//   return new bootstrap.Tooltip(tooltipTriggerEl)
// })


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
  // let correctAnswer = getByValue(arr, listWords[number]);
  // All numbers are equal
  let answerOne = null;
  let answerTwo = null;
  let answerThree = null;
  var numberTwo = 0;
  var numberThree = 0;
  var answerArray = [];

  let checkBox = document.getElementById("myCheck");

  if ( completeCount > 3 ) {
    do {
        numberTwo = Math.floor(Math.random() * (completeCount));
    } while(numberTwo === random);

    // run this loop until numberTwo is different than numberThree and numberOne
    do {
        numberThree = Math.floor(Math.random() * (completeCount));
    } while(numberThree === numberTwo || numberThree === random);
  }
  if (reverse === 0 ) {
    answerOne = Object.values(arr3)[random];
    answerTwo = Object.values(copyArr)[numberTwo];
    answerThree = Object.values(copyArr)[numberThree];
  }

  else {
    answerOne = Object.keys(arr3)[random];
    answerTwo = Object.keys(copyArr)[numberTwo];
    answerThree = Object.keys(copyArr)[numberThree];
  }

  answerArray.push(answerOne, answerTwo, answerThree);
  // let listmc = words2;
  // if ( count.length < 3 || x !='run' ) {
  //
  //   if (lang === 1 && filteredArr.length < 3) {
  //     listmc = words
  //   }
  //   if (lang === 2 && filteredArr.length < 3)  {
  //     listmc = words2
  //   }
  //
  //   random.push(correctAnswer);
  //   filteredArr = listmc.filter(e => e !== correctAnswer);
  //   random.push(filteredArr[Math.random() * filteredArr.length | 0]);
  //   filteredArr = filteredArr.filter(e => e !== random[1]);
  //   random.push(filteredArr[Math.random() * filteredArr.length | 0]);
  // }
  // else {
  //   // let correctAnswer = getByValue(arr, listWords[number]);
  //   random.push(correctAnswer);
  //   if (x != 'run' ) {
  //     filteredArr = listmc.filter(e => e !== correctAnswer);
  //   }
  //   else {
  //     filteredArr = filteredArr.filter(e => e !== correctAnswer);
  //   }
  //
  //   random.push(filteredArr[Math.random() * filteredArr.length | 0]);
  //   filteredArr = filteredArr.filter(e => e !== random[1]);
  //   random.push(filteredArr[Math.random() * filteredArr.length | 0]);
  //   }

    answerArray = shuffle(answerArray);
    for (let i = 0; i < answerArray.length; i++) {
      document.querySelectorAll(".multiplechoice")[i].innerHTML = answerArray[i];
      document.querySelectorAll(".multiplechoice")[i].setAttribute("onclick", 'multipleChoiceAnswer("' + answerArray [i] + '")');

  }

}

function multipleChoiceAnswer(a) {

  answer = a.toLowerCase();
  // res = arr.get(answer);
  // y = getByValue(arr, listWords[number]);
  // parsedY = y.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  compareAnswer(answer);
}

function addslashes( str ) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeList () {
  var text = Object.keys(arr3).map((key, value) => {
    return key + ' - ' + arr3[key] + '<br>';
  });
  document.querySelector("#allwords").innerHTML = text;
}


// speech
/*
 * Check for browser support
 */
// var supportMsg = document.getElementById('msg');

// if ('speechSynthesis' in window) {
// 	supportMsg.innerHTML = 'Uw browser <strong>ondersteund</strong> spraaksynthese.';
// } else {
// 	supportMsg.innerHTML = 'Sorry uw browser <strong>ondersteund geen</strong>s praaksynthese.';
// 	supportMsg.classList.add('not-supported');
// }


// Get the 'speak' button
var button = document.getElementById('speak');

// // Get the text input element.
// var speechMsgInput = document.getElementById('speech-msg');

// Get the voice select element.
var voiceSelect = document.getElementById('voice');

// Get the attribute controls.
var volumeInput = document.getElementById('volume');
var rateInput = document.getElementById('rate');
var pitchInput = document.getElementById('pitch');


// Fetch the list of voices and populate the voice options.
function loadVoices() {
  // Fetch the available voices.
	var voices = speechSynthesis.getVoices();

  // Loop through each of the voices.
	voices.forEach(function(voice, i) {
    // Create a new option element.
		var option = document.createElement('option');

    // Set the options value and text.
		option.value = voice.name;
		option.innerHTML = voice.name;

    // Add the option to the voice selector.
		voiceSelect.appendChild(option);
	});
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
};


// Create a new utterance for the specified text and add it to
// the queue.
function speak(text) {

  // Create a new instance of SpeechSynthesisUtterance.
	var msg = new SpeechSynthesisUtterance();

  // Set the text.
	msg.text = text;

  // Set the attributes.
	msg.volume = parseFloat(volumeInput.value);
	msg.rate = parseFloat(rateInput.value);
	msg.pitch = parseFloat(pitchInput.value);

  // If a voice has been selected, find the voice and set the
  // utterance instance's voice attribute.
	if (voiceSelect.value) {
		msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
	}

  // Queue this utterance.
	window.speechSynthesis.speak(msg);
}


// Set up an event listener for when the 'speak' button is clicked.
button.addEventListener('click', function(e) {
    textT = document.querySelector("#word");

    speak(textT.textContent);
});
