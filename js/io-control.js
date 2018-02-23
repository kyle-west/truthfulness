/** THIS IS A POST-BODY-CONTENT DOCUMENT **/

const OUTPUT = {};
const INPUT  = {};

OUTPUT.toggleSpinner = function (forceRemove = false) {
   if (OUTPUT.printElem.classList.contains("spinner") || forceRemove) {
      OUTPUT.printElem.classList.remove("spinner");
   } else {
      OUTPUT.printElem.innerHTML = "";
      OUTPUT.printElem.classList.add("spinner");
   }
}

OUTPUT.error = function (msg, err) {
   OUTPUT.toggleSpinner(true);
   OUTPUT.printElem.classList.add("error");
   OUTPUT.printElem.innerHTML = msg;
   if (err) console.error(err);
}

OUTPUT.print = function (html) {
   OUTPUT.toggleSpinner();
   OUTPUT.printElem.classList.remove("error");
   OUTPUT.printElem.innerHTML = html;
}

OUTPUT.printJSON = function (html) {
   OUTPUT.jsonElem.innerHTML = html;
}

OUTPUT.printORG = function (html) {
   OUTPUT.orgElem.innerHTML = html;
}

INPUT.focus = function () {
   INPUT.elem.focus()
}

INPUT.validInput = function () {
   // TODO: Check for well formed input
   // - [X] FALSE if expression is not in buffer
   // - [X] TRUE expression has just variables and no operators
   // - [X] FALSE if variable count if > 10
   // - [X] FALSE if missmatched parends
   // - [ ] FALSE if operands do not match operators

   var text = INPUT.elem.value;
   text = interpretSymbols(text).text.replace(/\s+/g, '');

   // FALSE if expression is not in buffer
   if (text.length === 0) {
      return {wellFormed: false, detail: "NO_EXP"};
   }

   // FALSE if variable count if > 10
   var variables = text.match(ALL_validVar) || [];
   var operators = text.match(ALL_OPS) || [];
   if (variables.length > 10) {
      return {wellFormed: false, detail: "EXP_TOO_LARGE"};
   }

   // FALSE if missmatched parends
   var openP  = text.match(/\(/g) || [];
   var closeP = text.match(/\)/g) || [];
   if (openP.length !== closeP.length) {
      return {wellFormed: false, detail: "PAREND_MISMATCH"};
   }


   if (operators.length === 0) {
      // TRUE expression has just variables and no operators
      if (variables.length > 0) {
         return {wellFormed: true};
      } else {
         return {wellFormed: false, detail: "NO_OPS_OR_VARS"};
      }
   }

   // Default return TRUE, other errors will get caught durring parsing
   return {wellFormed: true};
}

function io_init () {
   OUTPUT.printElem = OUTPUT.printElem || document.getElementById('raw-results');
   OUTPUT.jsonElem = OUTPUT.jsonElem || document.getElementById('json-table');
   OUTPUT.orgElem = OUTPUT.orgElem || document.getElementById('org-table');
   INPUT.elem = INPUT.elem || document.getElementById('raw-input');
   INPUT.focus()
   
   // return the cursor to its "original" position after pretty print
   document.getElementById("raw-input").addEventListener("input", (e) => {
      var prettyText = interpretSymbols(e.target.value);
      var cursorPos  = e.target.selectionStart + prettyText.sizeDiff;
      e.target.value = prettyText.text;
      e.target.setSelectionRange(cursorPos, cursorPos);
   });
}

function copyToClipboard (elem) {
   elem.select();
   document.execCommand("Copy");
}

function copyAsJSON () {
   copyToClipboard(document.getElementById("json-table"));
   notify();
}

function copyAsORG () {
   copyToClipboard(document.getElementById("org-table"));
   notify();
}

function notify () {
   document.querySelector('.notify').classList.add('show');
   setTimeout(_=>document.querySelector('.notify').classList.remove('show'), 2000)
}
