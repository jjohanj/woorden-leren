
if (location.hostname === "woorden" || location.hostname === "127.0.0.1") {
  var url = new URL('http://woorden/api.php')
}

else {
  var url = new URL('https://woorden-leren.nl/api.php')
}
var params = {id: cat}

url.search = new URLSearchParams(params).toString();


const fetchPromise = fetch(url);
fetchPromise.then(response => {
  return response.json();
}).then(data => {

  arr3 = data;

  arr1 = new Map(Object.entries(data));

  words = Array.from(arr1.values());

  arr2 = new Map();

  for (let [key, value] of arr1) {
    let v = arr1.get(key);
    arr2.set(v, key);
  }

  words2 = Array.from(arr2.values());
  var script   = document.createElement("script");
  script.type  = "text/javascript";
  script.src   = "../js/main.js?version=8";    // use this for linked script
  document.body.appendChild(script);
});
