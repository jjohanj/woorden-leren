
var arr1 = new Map([
  ["ik heet", "je m'appelle"],
  ["heten", "s'appeler"],
  ["de wijk", "le quartier"],
  ["de school", "l'école (f)"],
  ["het land", "le pays"],
  ["de hobby, passie", "la passion"],
  ["de stad", "la ville"],
  ["de inwoner", "l'habitant"],
["bonjour", "dag"],
["daar is, daar zijn", "voilà"],
["hier is, hier zijn", "voici"],
["de straat", "la rue"],
["in", "dans"],
["mooi, leuk", "joli"],
["de middelbare school, onderbouw", "le collège"],
["hoi", "salut"],
["ik ben dol op", "j'adore"],
["dol zijn op", "adore"],
["en jij?", "et toi?"],
["de klas", "la classe"],
["de vriend", "l'ami (m)"],
["ook", "aussi"],
["frankrijk", "la france"],
["groot", "grand"],
["er is, er zijn", "il y a"],
["het museum", "le musée"],
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
