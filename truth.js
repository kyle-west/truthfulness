"use strict";

function toggleSpinner() {
   var results = document.querySelector('#raw-results');
   if (results.classList.contains("spinner")) {
      results.classList.remove("spinner");
   } else {
      results.innerHTML = "";
      results.classList.add("spinner");
   }
}


function main () {
   if (validInput()) {
      toggleSpinner();
      // we need to give enough time for the spinner to display,
      // otherwise the computeAndDisplayResults function hogs all the CPU
      setTimeout(computeAndDisplayResults, 10);
   }
}

function validInput () {
   // TODO: Check for well formed input
   var text = document.querySelector('#raw-input').value;
   return text.length !== 0;
}


function computeAndDisplayResults () {
   var results = document.querySelector('#raw-results');
   var text = document.querySelector('#raw-input').value;
   text = interpretSymbols(text).text.replace(/\s+/g, '');
   var table = parseAsInlineTable(text);

   toggleSpinner();
   results.innerHTML = table.toHTML();
   document.querySelector('#json-table').innerHTML = table.toJSON();
   document.querySelector('#org-table' ).innerHTML = table.toORG();
}


function parseAsInlineTable (text) {
   var chars = text.split(""), calcs = [], results = [];

   // set up the calcuation strings for each cell.
   chars.forEach((c, idx) => {
      if (validVar.test(c)) {
         calcs.push(c);
      } else if (OPS.test(c)) {
         calcs.push(getLocalExecutionString(text, idx));
      } else {
         calcs.push(null);
      }
   });

   var vars = text.match(new RegExp(validVar, "g"));
   vars.values = generateTruthTable(vars);
   vars.values.forEach(val => {
      var row = [];
      calcs.forEach(col => {
         if (!col) {
            row.push("&nbsp;");
         } else {
            row.push(evalutate(col, val));
         }
      });
      results.push(row);
   });

   return new Table([chars, results]);
}

function getLocalExecutionString(text, idx) {
   var rhs = "", lhs = "";

   function nearestRight () {
      var i = idx+1, right = "", parends = 0;
      if (text[i] === NOT) {
         right = text[i]; i++;
      }
      do {
         if (text[i] === "(") parends++;
         if (text[i] === ")") parends--;
         right += text[i];
         i++;
      } while (parends > 0);
      return right;
   }

   function nearestLeft () {
      var i = idx-1, left = "", parends = 0;
      do {
         if (text[i] === ")") parends++;
         if (text[i] === "(") parends--;
         left = text[i] + left;
         i--;
      } while (parends > 0);
      if (text[i] === NOT) {
         left = text[i] + left;
      }
      return left;
   }

   // get right side of operator
   if (validVar.test(text[idx+1])) {
      rhs = text[idx+1];
   } else {
      rhs = nearestRight();
   }

   // NOT does not have a left operand
   if (text[idx] === NOT) {
      return convertOPStoJS(text[idx] + rhs);
   }

   // get left side of operator
   if (validVar.test(text[idx-1])) {
      lhs = text[idx-1];
   } else {
      lhs = nearestLeft();
   }

   return convertOPStoJS(lhs + text[idx] + rhs);
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

   return table;
}


function getBitValueByTablePosition (i, j) {
   return (Math.floor(i/(Math.pow(2,j))) % 2) ? 1 : 0;
}


function interpretSymbols (text) {
   var alt;
   alt = text.replace("/\\",  AND)
             .replace("&&",   AND)
             .replace(/and/i, AND)
             
             .replace("(+)",  XOR)
             .replace("+",    XOR)
             .replace(/xor/i, XOR)

             .replace("\\/", OR )
             .replace("||",  OR )
             .replace(/or/i, OR )

             .replace("~"  ,  NOT)
             .replace("`"  ,  NOT)
             .replace("!"  ,  NOT)
             .replace(/not/i, NOT)

             .replace("<--->", IFF)
             .replace("<-->",  IFF)
             .replace("<->",   IFF)
             .replace("<>",    IFF)
             .replace(/iff/i,  IFF)

             .replace("--->", IMP)
             .replace("-->",  IMP)
             .replace("->",   IMP)
             .replace(">",   IMP)
             .replace(/imp/i, IMP);
   return {text: alt, sizeDiff: alt.length - text.length};
}
