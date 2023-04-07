const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
 sidebar.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });

	function toggleSidebar() {
		sidebar.classList.remove("active");
	}

        // Define the mapping between HTML files and corresponding list items
        var htmlToFile = {
      'index.html': 0,
      'explore.html': 1,
      'shoppinglist.html': 2,
      'library.html': 3,
      'plan.html': 4
    };

    // Get the current filename
    var filename = location.pathname.split('/').pop();

    // Get the index of the corresponding list item
    var listItemIndex = htmlToFile[filename];

    // If the current HTML file is mapped to a list item
    if (listItemIndex !== undefined) {
      // Get all the links in the navbar
      var links = document.querySelectorAll('#navbar a');
      // Add the active class to the corresponding link
      links[listItemIndex].classList.add('active');
    }

    // Toggle the responsive menu
    function toggleMenu() {
      var navbar = document.getElementById("navbar");
      if (navbar.className === "") {
        navbar.className = "responsive";
      } else {
        navbar.className = "";
      }
    }