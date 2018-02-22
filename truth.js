function main () {
   var check = INPUT.validInput();
   if (check.wellFormed) {
      OUTPUT.toggleSpinner();
      // we need to give enough time for the spinner to display,
      // otherwise the computeAndDisplayResults function hogs all the CPU
      setTimeout(computeAndDisplayResults, 10);
   } else {
      OUTPUT.error(`Error code: "${check.detail}"`);
   }
}

function computeAndDisplayResults () {
   try {
      var text  = interpretSymbols(INPUT.elem.value).text.replace(/\s+/g, '');
      var table = parseAsInlineTable(text);
      OUTPUT.print(table.toHTML());
      OUTPUT.printORG(table.toORG());
      OUTPUT.printJSON(table.toJSON());
   } catch (err) {
      OUTPUT.error("Fatal Error: Could not evaluate expression during parsing.", err);
   }
}


function parseAsInlineTable (text) {
   var chars = text.split(""), calcs = [], results = [];

   // set up the calcuation strings for each cell.
   chars.forEach((c, idx) => {
      if (validVar.test(c)) {
         calcs.push(c);
      } else if (OPS.test(c)) {
         calcs.push(getLocalizedString(text, idx));
      } else if (OPTIONS.prefs.tableView === "inline") {
         calcs.push(null);
      }
   });

   if (OPTIONS.prefs.tableView === "expanded") {
      calcs = calcs.getUnique();
      calcs.sort(function(a, b){
         var ka = a.text || a,
             kb = b.text || b;
         if(ka.length < kb.length) return -1;
         if(ka.length > kb.length) return 1;
         return 0;
      });
      chars = [];
      calcs.forEach(calc => {
         chars.push(calc.text || calc);
      });
   }

   var vars = text.match(new RegExp(validVar, "g")).getUnique();
   vars.values = generateTruthTable(vars);
   vars.values.forEach(val => {
      var row = [];
      calcs.forEach(col => {
         if (!col) {
            row.push("&nbsp;");
         } else {
            row.push(evalutate(col.exe || col, val));
         }
      });
      results.push(row);
   });

   if (OPTIONS.prefs.trueFalse === "letter") {
      console.log("Converting Bools to Letters (T/F)");
      var newRes = [], newRow;
      results.forEach(row => {
         newRow = []
         row.forEach(col => {
            if (isNaN(col)) {
               newRow.push(col)
            } else {
               newRow.push((col == 1) ? "T" : "F");
            }
         });
         newRes.push(newRow);
      });
      results = newRes;
   }

   return new Table({headers:chars, data:results});
}

function getLocalizedString(text, idx) {
   var rhs = "", lhs = "", eval_text = "";

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
      eval_text = text[idx] + rhs;
      return {text: eval_text, exe: convertOPStoJS(eval_text)};
   }

   // get left side of operator
   if (validVar.test(text[idx-1])) {
      lhs = text[idx-1];
   } else {
      lhs = nearestLeft();
   }

   eval_text = lhs + text[idx] + rhs;
   return {text: eval_text, exe: convertOPStoJS(eval_text)};
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
   alt = text.replace(/nand/i, NAND)

             .replace("/\\",  AND)
             .replace("&&",   AND)
             .replace(/and/i, AND)

             .replace("(+)",  XOR)
             .replace("+",    XOR)
             .replace(/xor/i, XOR)

             .replace(/nor/i, NOR)

             .replace("\\/",  OR )
             .replace("||",   OR )
             .replace(/or/i,  OR )

             .replace("<--->", IFF)
             .replace("<-->",  IFF)
             .replace("<->",   IFF)
             .replace("<>",    IFF)
             .replace(/iff/i,  IFF)

             .replace("--->", IMP)
             .replace("-->",  IMP)
             .replace("->",   IMP)
             .replace(">",    IMP)
             .replace(/imp/i, IMP)

             .replace("-"  ,  NOT)
             .replace("~"  ,  NOT)
             .replace("`"  ,  NOT)
             .replace("!"  ,  NOT)
             .replace(/not/i, NOT)

             .replace("[", "(")
             .replace("]", ")")
             .replace("{", "(")
             .replace("}", ")")

             .replace(NOT+OR, NOR)
             .replace(NOT+AND, NAND);
   return {text: alt, sizeDiff: alt.length - text.length};
}
