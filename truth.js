var validVar = /[A-z]/;
var parends = /(\(.*\)){1}/g;

function createStack(text) {
   var operator, lhs, rhs;
   var sub = text.match(parends);
   sub = sub && sub[0] && sub[0].slice(1, sub[0].length - 1);

   if (sub) {
      console.log(sub);
      var sub_logic = createStack(sub);
      var temp = text.replace(`(${sub})`, '{}');
      var one = new Value(sub[sub.search(validVar)]);
      var two = new Value()
      console.log(`----> ${temp}, ${one}`);

   } else {
      lhs = text[0];
      rhs = text[text.length - 1];
      operator = text.slice(1, text.length - 1);
      console.log(`"${operator}" on "${lhs}" and "${rhs}"`);
      return new Logic(operator, [new Value(lhs), new Value(rhs)]);
   }
}

function parse(text) {
   var parsed = text;
   createStack(text)
   return parsed;
}

function crunch() {
   var text = document.querySelector('#raw-input').value;
   text = text.replace(/\s+/g, '');
   document.querySelector('#raw-results').value = parse(text);
}
