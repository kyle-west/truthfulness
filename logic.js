function evalutate (equation, values) {
   var eq = equation;
   Object.keys(values).forEach(v => {
      eq = eq.replace(new RegExp(v, "g"), values[v]);
   })

   eq = convertOPStoJS(eq)

   return new Number(eval(eq))
}

function convertOPStoJS (opStr) {
   return opStr.replace(ALL_AND, "&&")
               .replace(ALL_OR,  "||")
               .replace(ALL_XOR, "!=")
               .replace(ALL_NOT, "!")
               .replace(ALL_IMP, "==0?1:")
               .replace(ALL_IFF, "==");
}
