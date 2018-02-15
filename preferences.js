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
   OPTIONS.prefs.tableView = OPTIONS.prefs.tableView || "inline";
   OPTIONS.selectCurrents();
}

OPTIONS.updateCurrent = function () {
   var tv = document.querySelector(`input[name='table-view'][value='inline']`);
   tv = (tv.checked) ? tv : document.querySelector(`input[name='table-view'][value='expanded']`);
   OPTIONS.prefs.tableView = tv.value;
}

OPTIONS.selectCurrents = function () {
   document.querySelector(`input[name='table-view'][value='${OPTIONS.prefs.tableView}']`).checked = "checked";
}


// apply current options
OPTIONS.modal = document.getElementById('settings-modal');
OPTIONS.restore();
