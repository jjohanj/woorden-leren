
var arr1 = new Map([
["Frans", "français(e)"],
["Nederlands", "néerlandais(e)"],
["Canadees", "canadien, canadienne"],
["Belgisch", "Belge"],
["de zee", "la mer"],
["geweldig", "super"],
["klein", "petit"],
["van", "de"],
["blij, tevreden", "content"],
["of", "ou"],
["sportief","sportif, sportive"],
["de bus", "le bus"],
["de fiets", "le vélo"],
["het dorp", "le village"],
["de achternaam", "le nom de famille"],
["de leeftijd", "l'âge (m)"],
["het adres", "l'adresse (f)"],
["de nationaliteit", "la nationalité"],
["dichtbij", "près de"],
["dan, dus", "alors"],
["zwemmen", "nager"],
["de televise", "la télé"],
["de muziek", "la musique"],
["de verdieping", "l'etage (m)"],
["gelukkig", "heureusement"],
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
