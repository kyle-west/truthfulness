// Repeat a string a certain amount of times.
// Example: "A".repeat(3) ---> returns "AAA"
String.prototype.repeat = function (times) {
   var str = "", i;
   for (i = 0; i < times; i++) {
      str += this;
   }
   return str;
}

// return an ordered set of the values in the array.
Array.prototype.getUnique = function () {
   var unique = [];
   this.forEach(elem => {
      if (!unique.includes(elem)) {
         unique.push(elem);
      }
   });
   return unique;
}
