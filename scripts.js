
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// check if recipe is saved in localStorage
var recipeJson = localStorage.getItem('recipe');
if (recipeJson) {
  var recipeObj = JSON.parse(recipeJson);
  if (recipeObj.saved === 'y') {
    // assign the "active" class to the link with href="library.html"
    var libraryLink = document.querySelector('a[href="library.html"]');
    libraryLink.classList.add('active');
  } else {
    // assign the "active" class to the link with href="explore.html"
    var exploreLink = document.querySelector('a[href="explore.html"]');
    exploreLink.classList.add('active');
  }
} else {
  // get the current URL
  var currentUrl = window.location.href;

  // get all the links in the navigation bar
  var links = document.querySelectorAll('.topnav a');

  // loop through the links and check if the URL matches
  for (var i = 0; i < links.length; i++) {
    var linkUrl = links[i].href;
    if (currentUrl === linkUrl) {
      links[i].classList.add('active');
    }
  }
}
