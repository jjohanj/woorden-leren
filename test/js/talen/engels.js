
var arr1 = new Map([
['arts and design', 'beeldende vorming'],
['assembly', 'samenkomst',],
['biology', 'biologie'],
['corridor', 'gang'],
['geography', 'aardrijkskunde'],
['head teacher', 'school directeur'],
['history', 'geschiedenis'],
['mathematics, maths', 'wiskunde'],
['paragraph', 'alinea'],
['period', 'lesuur'],
['physical education', 'gym'],
['secondary school', 'middelbare school'],
['story', 'verhaal'],
['to take notes', 'aantekeningen maken'],
['to take out', 'pakken'],
['to understand', 'begrijpen'],
['year 7', 'brugklas'],
['desk','bureau'],
['to think', 'denken'],
['pencil case', 'etui'],
['rubber', 'gum'],
['to do homework', 'huiswerk maken'],
['classmate', 'klasgenoot'],
['student', 'leerling'],
['to learn', 'leren'],
['to study','bestuderen'],
['to teach', 'onderwijzen'],
['lesson', 'les'],
['pen', 'pen'],
['pencil', 'potlood'],
['backpack', 'rugzak'],
['exercise boook', 'schrift'],
['textbook', 'tekstboek'],
['subject', 'vak'],
]);

console.log(arr1);
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
