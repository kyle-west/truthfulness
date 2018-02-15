/******************************************************************************
* Take an array of JSON objects (with identical keys) and turn it into various
* display formats
******************************************************************************/

function Table (table) {
   this.headers = table.headers;
   this.data    = table.data;
}

Table.prototype = {
   constructor : Table,

   toHTML : function () {
      var html = `<table>${this._headerHTML()}<tbody>`;
      this.data.forEach((row) => {
         html += "<tr>";
         this.headers.forEach((name, index) => {
            html += `<td${validVar_only.test(name) ? " class='var'" : ""}>${row[index]}</td>`;
         });
         html += "</tr>";
      });
      return html + `</tbody></table>`;
   },

   _headerHTML: function () {
      var html = "<thead><tr>";
      this.headers.forEach((name) => {
         var cl = "";
         if (["(",")"].includes(name)) {
            cl = " class = 'op parend'"
         } else if (validVar_only.test(name)) {
            cl = " class='var'";
         } else if (OPS.test(name)) {
            switch (name) {
               case NOT: cl = " class = 'op not'"; break;
               case AND: cl = " class = 'op and'"; break;
               case NAND: cl = " class = 'op nand'"; break;
               case OR:  cl = " class = 'op or'";  break;
               case NOR: cl = " class = 'op nor'"; break;
               case XOR: cl = " class = 'op xor'"; break;
               case IMP: cl = " class = 'op imp'"; break;
               case IFF: cl = " class = 'op iff'"; break;
            }
         }

         html += `<th${cl}>${name}</th>`;
      });
      return html + "</tr></thead>";
   },

   toJSON : function () {
      return JSON.stringify({
         headers: this.headers, data: this.data
      }, null, 3);
   },

   toORG: function () {
      var org = this._headerORG();
      this.data.forEach((row) => {
         org += "|";
         this.headers.forEach((name, index) => {
            org += " ".repeat(name.length/2)
                + row[index]
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
      var last_one = this.headers.length -1;
      this.headers.forEach((name, idx) => {
         html += ` ${name} |`;
         bar  += "-".repeat(name.length+2)
              + ((idx === last_one) ? "|" : "+");
      });
      return html + "\n" + bar + "\n";
   },
}
