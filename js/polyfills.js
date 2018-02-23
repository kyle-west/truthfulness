// determine the acutal type of an object
function typeOf (obj) {
  return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];
}


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
Array.prototype.includesExtended = function (item) {
   var isObj = (typeOf(item) === "Object");
   for (var i = 0; i < this.length; i++) {
      if (isObj && typeOf(this[i]) === "Object") {
         if (this[i].equals(item)) return true;
      } else {
         if (this[i] === item) return true;
      }
   }
   return false;
}


// return an ordered set of the values in the array.
Array.prototype.getUnique = function () {
   var unique = [];
   this.forEach(elem => {
      if (!unique.includesExtended(elem)) {
         unique.push(elem);
      }
   });
   return unique;
}


// find if two objects are equal
Object.prototype.equals = function (elem) {
   var lhs = Object.getOwnPropertyNames(this),
       rhs = Object.getOwnPropertyNames(elem),
       i = 0;
   if (lhs.length !== rhs.length) return false;
   for (i; i < rhs.length; i++) {
      if (this[rhs[i]] !== elem[rhs[i]]) return false;
   }
   return true;
}
