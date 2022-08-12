
var arr1 = new Map([
["de familie, het gezin", "la famille"],
["de broer", "le frère"],
["de zus", "la soeur"],
["de ouders", "les parents"],
["het kind", "l'enfant"],
["de vader", "la père"],
["de moeder", "la mère"],
["de oma", "la grand-mère"],
["de opa", "le grand-père"],
["het jaar", "l'an (m)"],
["het westen", "l'ouest (m)"],
["zaterdag", "samedi"],
["juni", "juin"],
["de prijs", "le prix"],
["klein", "petit"],
["de tweeling", "les jumeaux (m pl)"],
["werken", "travailler"],
["ander", "autre"],
["de grootouders", "les grands-parents"],
["bij ons (thuis)", "chez nous"],
["de hond", "le chien"],
["zwart", "noir"],
["allebei", "tous les deux"],
["het kind", "l'enfant (m/f)"],
["de volwassene", "l'adulte (m/f)"],
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
