
var arr1 = new Map([
["nominativus (e)", "servus"],
["genitivus (e)", "servi"],
["dativus (e)", "servo"],
["accusativus (e)", "servum"],
["ablativus (e)", "servo"],
["nominativus (m)", "servi"],
["genitivus (m)", "servorum"],
["dativus (m)", "servis"],
["accusativus (m)", "servos"],
["ablativus (m)", "servis"],
["stam", "serv-"],
["betekenis","slaaf"],

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
