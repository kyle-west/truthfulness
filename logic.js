

function Logic (text) {
   this.parse(text);
}

Logic.prototype = {
   constructor: Logic,

   parse: function (text) {
      var operator, lhs, rhs;
      var sub = text.match(parends);

      if (sub)
   }
}


// if (sub) {
//    // console.log(sub);
//    var sub_logic = createTree(sub);
//    // var temp = text.replace(`(${sub})`, '{}');
//    // var one = new Value(sub[sub.search(validVar)]);
//    // var two = new Value()
//    // console.log(`----> ${temp}, ${one}`);
//
// } else {
//    lhs = text[0];
//    rhs = text[text.length - 1];
//    operator = text.slice(1, text.length - 1);
//    console.log(`"${operator}" on "${lhs}" and "${rhs}"`);
//    return new Logic(operator, [new Value(lhs), new Value(rhs)]);
// }
