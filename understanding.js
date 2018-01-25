/******************************************************************************
* Take an array of JSON objects (with identical keys) and turn it into HTML
******************************************************************************/

function Table (data) {
   this.data = data;
   this.names = Object.keys(data[0]);
}

Table.prototype = {
   constructor : Table,

   toHTML : function () {
      var html = `<table>${this._header()}<tbody>`;
      this.data.forEach((row) => {
         html += "<tr>";
         this.names.forEach((name) => {
            html += `<td>${row[name]}</td>`
         });
         html += "</tr>";
      });
      return html + `</tbody></table>`;
   },

   _header: function () {
      var html = "<thead><tr>";
      this.names.forEach((name) => {
         html += `<th>${name}</th>`;
      });
      return html + "</tr></thead>";
   }
}
