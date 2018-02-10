const validVar = /[a-z]/;
const parends  = /(\(.*\)){1}/g;
const AND = "∧";
const OR  = "∨";
const XOR = "⊕";
const IMP = "→";
const IFF = "↔";
const NOT = "¬";
const OPS = new RegExp(`(${AND}|${OR}|${XOR}|${NOT}|${IMP}|${IFF})`);

const ALL_AND = new RegExp(AND, "g");
const ALL_OR  = new RegExp(OR,  "g");
const ALL_XOR = new RegExp(XOR,  "g");
const ALL_NOT = new RegExp(NOT, "g");
const ALL_IMP = new RegExp(IMP, "g");
const ALL_IFF = new RegExp(IFF, "g");
const ALL_OPS = new RegExp(`(${AND}|${OR}|${XOR}|${NOT}|${IMP}|${IFF})`, "g");


String.prototype.repeat = function (times) {
   var str = "", i;
   for (i = 0; i < times; i++) {
      str += this;
   }
   return str;
}
