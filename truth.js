const validVar = /[A-z]/;
const parends  = /(\(.*\)){1}/g;
const AND = "∧";
const OR  = "∨";
const NOT = "¬";
const IMP = "→";
const IFF = "↔";

// (((p-->q)/\r)\/s)<->~t
const OPS = new RegExp(`(${AND}|${OR}|${NOT}|${IMP}|${IFF})`, "g");


function crunch() {
   var text = document.querySelector('#raw-input').value;
   text = text.replace(/\s+/g, '');
   document.querySelector('#raw-results').innerHTML = parseAsTable(text);
}

// NOTE: look into Djikstra's shunting yard

function parseAsTable(text) {
   var vars = text.match(new RegExp(validVar, "g"));
   var var_values = generateTruthTable(vars);
   return new Table(var_values).toHTML();
}


function generateTruthTable(vars) {
   var n = vars.length;
   var size = Math.pow(2, n);
   var i , j, bit, valueMap;
   var table = [];

   for (i = 0; i < size; i++) {
      valueMap = {};
      for (j = n-1; j >= 0; j--) {
         bit = getBitValueByTablePosition(i, j);
         valueMap[vars[n-1-j]] = bit;
      }
      table.push(valueMap);
   }

   console.table(table);
   return table;
}

function getBitValueByTablePosition (i, j) {
   return (Math.floor(i/(Math.pow(2,j))) % 2) ? 1 : 0;
}

function interpretSymbols(text) {
   return text.replace("/\\", AND)
              .replace("\\/", OR )
              .replace("~"  , NOT)
              .replace("-->", IMP)
              .replace("<->", IFF);
}
