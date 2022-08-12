
var arr1 = new Map([
["carrot", "wortel"],
["to choose", "kiezen"],
["cucumber", "komkommer"],
["dairy", "zuivel"],
["delicious", "heerlijk"],
["dessert, pudding", "toetje"],
["dish", "gerecht"],
["healthy", "gezond"],
["lamb (mince)", "lamsvlees (gehakt)"],
["main (course)", "hoofdgerecht"],
["organic", "biologisch"],
["potato", "aardappel"],
["raspberry", "framboos"],
["side (dish)", "bijgerecht"],
["starter", "voorgerecht"],
["strawberry", "aardbei"],
["tomato", "tomaat"],
["apple", "appel"],
["to order", "bestellen"],
["bread", "brood"],
["to serve", "(op)dienen"],
["egg", "ei"],
["to eat(up)", "(op)eten"],
["fruit", "fruit"],
["vegetable", "groente"],
["ice cream", "ijs"],
["cheese", "kaas"],
["chicken", "kip"],
["biscuit (uk), cookie (us)", "koekje"],
["lunch", "lunch"],
["meal", "maaltijd"],
["chips (uk)", "french fries (us)"],
["to taste (like)", "smaken (naar)"],
["soup", "soep"],
["fish", "vis"],
["meat", "vlees"],
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
