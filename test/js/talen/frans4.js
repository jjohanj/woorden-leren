
var arr1 = new Map([
["de jongen", "le garçon"],
["het meisje", "la fille"],
["de vriendin", "l'amie (f)"],
["hoe?", "comment?"],
["het gaat goed", "ça va bien"],
["de voornaam", "le prénom"],
["jij woont", "tu habites"],
["wonen","habiter"],
["wie?", "qui?"],
["ja", "oui"],
["nee", "non"],
["jij heet", "tu t'appelles"],
["heten", "s'appeler"],
["hoe gaat het?", "ça va?"],
["bedankt", "merci"],
["voorstellen", "présenter"],
["ik?", "moi?"],
["tot ziens", "au revoir"],
["tot later", "à plus"],
["leuk", "chouette"],
["nieuw", "nouveau, nouvelle"],
["daar, daarginds", "là bas"],
["kijk!", "regarde!"],
["kijken naar", "regarder"],
["vlakbij", "tout près"],
 ["luister!", "écoutez!"],
 ["luisteren naar", "écouter"],
 ["het is tijd", "c'est l'heure"],
 ["sorry", "excuse-moi"],
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
