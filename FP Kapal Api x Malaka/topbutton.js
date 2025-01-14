// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    console.log('Scroll detected:', document.documentElement.scrollTop);
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      console.log('Show button');
      mybutton.style.display = "block";
    } else {
      console.log('Hide button');
      mybutton.style.display = "none";
    }
  }

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}