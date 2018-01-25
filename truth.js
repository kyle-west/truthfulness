const validVar = /[A-z]/;
const parends  = /(\(.*\)){1}/g;

function crunch() {
   var text = document.querySelector('#raw-input').value;
   text = text.replace(/\s+/g, '');
   document.querySelector('#raw-results').value = parseAsTable(text);
}

function parseAsTable(text) {
   var vars = text.match(new RegExp(validVar, "g"));
   return generateTruthTable(vars);
}


function generateTruthTable(vars) {
   var table = "";
   var n = vars.length;
   var size = Math.pow(2, n);
   vars.forEach(v=>{
      table += `| ${v} `;
   });
   table += "|\n";
   var i , j;
   for (i = 0; i < size; i++) {
      for (j = n-1; j >= 0; j--) {
         table += `| ${getBitValueByTablePosition(i, j)} `;
      }
      table += `|\n`;
   }
   return table;
}

function getBitValueByTablePosition (i, j) {
   return (Math.floor(i/(Math.pow(2,j))) % 2) ? 1 : 0;
}
