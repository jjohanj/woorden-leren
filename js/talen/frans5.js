
var arr1 = new Map([
["de vriend", "l'ami"],
["de vriendin", "l'amie"],
["het hotel", "l'hôtel"],
["het adres", "l'adresse"],
["de jongens", "les garçons"],
["de meisjes", "les filles"],
["de bomen", "les arbres"],
["de hotel","les hôtels"],
["een jongen", "un garçon"],
["een middelbare school", "un collège"],
["een hotel", "un hôtel"],
["een meisje", "une fille"],
["een klas", "une classe"],
["een adres", "une adresse"],
["vrienden", "des amis"],
["meisjes", "des filles"],
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
