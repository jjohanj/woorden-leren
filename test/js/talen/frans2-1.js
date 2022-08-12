
var arr1 = new Map([
["de familie, het gezin", "la famille"],
["de broer", "le frère"],
["de zus", "la soeur"],
["de ouders", "les parents"],
["het kind", "l'enfant"],
["de vader", "la père"],
["de moeder", "la mère"],
["papa", "papa"],
["mama", "maman"],
["de zoon", "le fils"],
["thuis", "à la maison"],
["de uitnodiging", "l'invitation"],
["organiseren", "organiser"],
["de dochter", "la fille"],
["de oom", "l'oncle"],
["de tante", "la tante"],
["de opa", "le grand-père"],
["de oma", "la grand-mère"],
["de grootouders", "les grands-parents"],
["de neef", "le cousin"],
["de nicht", "la cousine"],
["getrouwd", "marié"],
["trouwen", "se marier"],
["gescheiden", "divorcé"],
["scheiden", "divorcer"],
["ontmoeten", "recontrer"],
["de afspraak", "le rendez-vous"],
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
