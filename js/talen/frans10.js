
var arr1 = new Map([
["kijk", "regarde"],
["lees", "lis"],
["luister", "écoute"],
["schrijf", "écris"],
["beantwoord", "réponds"],
["vul aan", "complète"],
["combineer", "combine"],
["werk", "travaillez"],
]);

let words = Array.from(arr1.values());

let arr2 = new Map();

for (let [key, value] of arr1) {
  let v = arr1.get(key);
  arr2.set(v, key);
}

let words2 = Array.from(arr2.values());

var script   = document.createElement("script");
script.type  = "text/javascript";
script.src   = "js/main.js";    // use this for linked script
document.body.appendChild(script);
