
let words =
[ 'flumen, flumina',
'rex, reges',
'servus',
'vocare',
'venire',
'audire',
'vidére',
'puer, pueri',
'iacére',
'clamare',
'et',
'lacrimare',
'necare',
'iubére',
'timére',
'ideo',
'mandatum',
'non',
'recusare',
'tamen',
'tollere',
'ad',
'portare',
'in',
'ponere',
'locus',
'ubi',
'aqua',
'inter',
'arbor, arbores',
'ibi'];

var arr1 = new Map([
  ['rivier', 'flumen, flumina'],
  ['koning', 'rex, reges'],
  ['slaaf', 'servus'],
  ['roepen, noemen', 'vocare'],
  ['komen', 'venire'],
  ['horen', 'audire'],
  ['zien', 'vidére'],
  ['jongen', 'puer, pueri'],
  ['liggen', 'iacére'],
  ['schreeuwen', 'clamare'],
  ['en, ook', 'et'],
  ['huilen', 'lacrimare'],
  ['doden', 'necare'],
  ['bevelen', 'iubére'],
  ['vrezen, bang zijn voor', 'timére'],
  ['daarom', 'ideo'],
  ['opdracht', 'mandatum'],
  ['niet', 'non'],
  ['weigeren', 'recusare'],
  ['toch', 'tamen'],
  ['optillen', 'tollere'],
  ['naar, tot, bij', 'ad'],
  ['dragen', 'portare'],
  ['in, naar', 'in'],
  ['plaatsen', 'ponere'],
  ['plaats', 'locus'],
  ['waar', 'ubi'],
  ['water', 'aqua'],
  ['tussen, tijdens', 'inter'],
  ['boom', 'arbor, arbores'],
  ['daar', 'ibi'],
]);

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
