function Logic (operator, values = []) {

}

Logic.prototype = {
   constructor: Logic,
   apply: function () {
      console.log(`Applying "${operator}" on "${lhs}" and "${rhs}"`);
   }
};
