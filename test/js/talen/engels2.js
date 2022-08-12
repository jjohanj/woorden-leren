
var arr1 = new Map([
["accessory", "accesoire"],
["to fit", "passen"],
["to go with", "passen bij"],
["jumper (uk), sweater (US)", "trui"],
["leggings", "legging"],
["to match", "passen bij"],
["(to be) on sale", "in de uitverkoop zijn"],
["(to be) om trend", "in de mode zijn"],
["outfit", "kledingcombinatie"],
["to pick out", "uitkiezen"],
["pyjamas", "pyjama"],
["to redommend", "aanbevelen"],
["suit", "pak"],
["to suit", "goed staan"],
["tie", "stropdas"],
["to try (something) on", "passen"],
["to zip up", "dichtritsen"],
["to put on", "aantrekken"],
["blouse", "bloes"],
["trousers (uk), pants (us)", "(lange broek)"],
["to wear", "dragen"],
["trainers (uk), sneakers (us)", "gymschoenen, gympies"],
["coat", "(lange) jas"],
["jacket", "jas(je)"],
["dress", "jurk"],
["clothes", "kleren"],
["to buy", "kopen"],
["shorts", "korte broek"],
["size", "maat"],
["hat", "muts; hoed"],
["shirt", "overhemd"],
["skirt", "rok"],
["shoe", "schoen"],
["scarf", "sjaal"],
["sock", "sok"],
["(a pair of) jeans", "spijkerbroek"],
["to take off", "uittrekken"],


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
