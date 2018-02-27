function evalutate (equation, values) {
   var eq = equation;
   Object.keys(values).forEach(v => {
      eq = eq.replace(new RegExp(v, "g"), values[v]);
   });
   return new Number(eval(eq))
}

function convertOPStoJS (opStr) {
   opStr = sameLevelOps(opStr);
   return opStr.replace(ALL_AND, "&&")
               .replace(ALL_NAND, "!==1||1!==")
               .replace(ALL_OR,  "||")
               .replace(ALL_NOR, "==0&&0==")
               .replace(ALL_XOR, "!=")
               .replace(ALL_NOT, "!")
               .replace(ALL_IMP, "==0?1:")
               .replace(ALL_IFF, "==");
}

function sameLevelOps (opStr) {
   var str = "", levelOps = 0, p = 0, inside = "";
   for (var i = 0; i < opStr.length; i++) {
      if (opStr[i] === "(") {
         p++;
      } else if (opStr[i] === ")") {
         p--;
         if (p === 0) {
            str += "(" + sameLevelOps(inside.substr(1));
         }
      } else if (p < 1 && opStr[i] !== NOT && OPS.test(opStr[i])) {
         levelOps++;
         str += ")";
      }
      if (p > 0) {
         inside += opStr[i];
      } else {
         str += opStr[i];
      }
   }
   str = "(".repeat(levelOps) + str;
   return str;
}
