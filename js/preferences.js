const OPTIONS = {prefs: {}};

OPTIONS.show = function () {
   OPTIONS.modal.classList.remove("hidden");
}

OPTIONS.close = function (restore = false) {
   if (restore) OPTIONS.restore();
   OPTIONS.modal.classList.add("hidden");
   console.log(OPTIONS.prefs);
}

OPTIONS.save = function () {
   OPTIONS.updateCurrent();
   OPTIONS.close();
}

OPTIONS.restore = function () {
   OPTIONS.prefs.tableView = window.localStorage.getItem("prefs-tableView") || "inline";
   OPTIONS.prefs.trueFalse = window.localStorage.getItem("prefs-trueFalse") || "binary";
   OPTIONS.selectCurrents();
}

OPTIONS.updateCurrent = function () {
   var tv = document.querySelector(`input[name='table-view'][value='inline']`);
   tv = (tv.checked) ? tv : document.querySelector(`input[name='table-view'][value='expanded']`);
   OPTIONS.prefs.tableView = tv.value;
   window.localStorage.setItem("prefs-tableView", tv.value);

   var bin = document.querySelector(`input[name='true-false'][value='binary']`);
   bin = (bin.checked) ? bin : document.querySelector(`input[name='true-false'][value='letter']`);
   OPTIONS.prefs.trueFalse = bin.value;
   window.localStorage.setItem("prefs-trueFalse", bin.value);
}

OPTIONS.selectCurrents = function () {
   document.querySelector(`input[name='table-view'][value='${OPTIONS.prefs.tableView}']`).checked = "checked";
   document.querySelector(`input[name='true-false'][value='${OPTIONS.prefs.trueFalse}']`).checked = "checked";
}


// apply current options
OPTIONS.modal = document.getElementById('settings-modal');
OPTIONS.restore();
