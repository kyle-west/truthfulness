function Logic (operator, values = []) {
   this.operator = operator;
   this.values = values;
}

Logic.prototype = {
   constructor: Logic,
   apply: function () {
      // console.log(`Applying "${operator}" on "${lhs}" and "${rhs}"`);
   },

   toString: function () {
      return `{${this.operator}${(this.values[0]) ? ", " + this.values[0]: ""}${(this.values[1]) ? ", " + this.values[1]: ""}}`;
   }
};

var COMPOSIT_COUNTER = 0;

function Value (symbol, isVariable = true) {
   this.isVariable = isVariable;
   this.isComposite = !this.isVariable;
   if (this.isComposite) {
      this.ref = COMPOSIT_COUNTER++;
      this.symbol = symbol;
   } else {
      this.ref = symbol;
   }
}

Value.prototype.toString = function () {
   return this.ref
};
