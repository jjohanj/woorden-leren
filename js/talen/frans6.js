
var arr1 = new Map([
["in de brugklas", "en cinquième"],
["hetzelfde", "la même"],
["aardig", "sympa"],
["ik stel je voor", "je te présente"],
["voorstellen", "présenter"],
["waar?", "où?"],
["het huis", "la maison"],
["het zwembad", "la piscine"],
["ver", "loin"],
["het appartement", "l'appartement"],
["de tuin", "le jardin"],
["hij heet", "il s'appelle"],
["heten", "s'appeler"],
["de minuut", "la minute"],
["nu", "maintenant"],
["heel, erg", "très"],
["goed", "bien"],
["en", "et"],
["maar", "mais"],
["met", "avec"],
["meneer", "monsieur"],
["mevrouw", "madame"],
["het is waar", "c'est vrai"],
["het is mogelijk", "c'est possible"],
["het voetbalveld", "le terrein de foot"],
["geweldig", "génial"],
["we gaan, zullen", "on va"],
["gaan", "aller"],
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
