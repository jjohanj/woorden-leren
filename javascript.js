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
  document.querySelector(".clone:last-of-type  div:first-of-type input").value = "";
  document.querySelector(".clone:last-of-type  div:last-of-type input").value = "";
  // lastInput[nodes.length- 1].value = '' ;
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

/*!
    * Start Bootstrap - SB Admin v7.0.4 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    //
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});
