/** THIS IS A POST-BODY-CONTENT DOCUMENT **/

var STICK_HEADER = document.querySelector('#raw-results-sticky-header');

// watch on the table content change to update the sticky header
document.getElementById("raw-results").addEventListener("DOMSubtreeModified", (e) => {
   var header = e.target.querySelector('#raw-results-header');
   if (header) {
      STICK_HEADER.innerHTML = "<thead>" + header.innerHTML + "</thead>";
   }
});

// show the sticky header when the attached header is out of view.
window.onscroll = function(e) {
   var header = document.querySelector('#raw-results thead');
   if (header && (header.getBoundingClientRect().y > 0)) {
      STICK_HEADER.classList.add('hidden');
   } else {
      STICK_HEADER.classList.remove('hidden');
   }
}
