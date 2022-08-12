// const fetchPromise = fetch("https://woorden-leren.nl/api.php");
// fetchPromise.then(response => {
//   return response.json();
// }).then(people => {
//   console.log(people);
//   let myMap = new Map(Object.entries(people));
//   console.log(myMap);
// });

// fetch('http://localhost/woorden-leren-backend/api.php').then(function(response) {
//   return response.json();
// }).then(function(parsedJson) {
//   console.log('This is the parsed json', parsedJson);
// })


function addField() {
  let inputField = document.querySelector(".clone").cloneNode(true);
  document.querySelector(".fields").appendChild(inputField);
}
console.log(inputField);
