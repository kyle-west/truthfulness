const validVar = /[a-z]/;
const parends  = /(\(.*\)){1}/g;
const AND = "∧";
const OR  = "∨";
const IMP = "→";
const IFF = "↔";
const NOT = "¬";

const ALL_AND = new RegExp(AND, "g");
const ALL_OR  = new RegExp(OR,  "g");
const ALL_NOT = new RegExp(NOT, "g");
const ALL_IMP = new RegExp(IMP, "g");
const ALL_IFF = new RegExp(IFF, "g");

const OPS = new RegExp(`(${AND}|${OR}|${NOT}|${IMP}|${IFF})`, "g");

String.prototype.repeat = function (times) {
   var str = "", i;
   for (i = 0; i < times; i++) {
      str += this;
   }
   return str;
}
