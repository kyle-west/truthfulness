/******************************************************************************
* Take an array of JSON objects (with identical keys) and turn it into various
* display formats
******************************************************************************/

function Table (data) {
   this.data = data;
   this.names = Object.keys(data[0]);
}

Table.prototype = {
   constructor : Table,

   toHTML : function () {
      var html = `<table>${this._headerHTML()}<tbody>`;
      this.data.forEach((row) => {
         html += "<tr>";
         this.names.forEach((name) => {
            html += `<td>${row[name]}</td>`
         });
         html += "</tr>";
      });
      return html + `</tbody></table>`;
   },

   _headerHTML: function () {
      var html = "<thead><tr>";
      this.names.forEach((name) => {
         html += `<th>${name}</th>`;
      });
      return html + "</tr></thead>";
   },

   toJSON : function () {
      return JSON.stringify(this.data, null, 2);
   },

   toORG: function () {
      var org = this._headerORG()
      this.data.forEach((row) => {
         org += "|";
         this.names.forEach((name) => {
            org += " ".repeat(name.length/2)
                + row[name]
                + " ".repeat(name.length/2)
                + ((name.length % 2 == 0) ? " " : "")
                + "|";
         });
         org += "\n";
      });
      return org;
   },

   _headerORG: function () {
      var html = "|";
      var bar  = "|";
      var last_one = this.names.length -1;
      this.names.forEach((name, idx) => {
         html += ` ${name} |`;
         bar  += "-".repeat(name.length+2)
              + ((idx === last_one) ? "|" : "+");
      });
      return html + "\n" + bar + "\n";
   },
}
