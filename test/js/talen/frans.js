
var arr1 = new Map([
  ['bonjour', 'dag'],
  ['au revoir', 'tot ziens'],
  ['bonsoir', 'goedenavond'],
  ['salut', 'hoi'],
  ['à bientôt', 'tot gauw'],
  ['à plus', 'tot later'],
  ['à demain', 'tot morgen'],
  ['ça va?', 'hoe gaat het?'],
  ['pas mal', 'niet slecht'],
  ['merci', 'bedankt'],
  ['oui', 'ja'],
  ['non', 'nee'],
  ['le garçon', 'de jongen'],
  ['la fille', 'het meisje'],
  ['je m\'appelle', 'ik heet'],
  ['s\'appeler', 'heten'],
  ['j\'habite', 'ik woon'],
  ['habiter', 'wonen'],
  ['voici', 'hier is, hier zijn'],
  ['voilà', 'daar is, daar zijn'],
  ['monsieur', 'meneer'],
  ['madame', 'mevrouw'],
  ['il y a', 'er is, er zijn'],
  ['c\'est', 'het is, dat is'],
  ['français', 'Frans'],
  ['néerlandais', 'Nederlands'],
  ['où?', 'waar?'],
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
