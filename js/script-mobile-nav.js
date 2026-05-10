
/* JavaScript code for the mobile nav + dark mode */
/* gets the elements that we need by their ID */
var btn = document.getElementById("navButton");
var menu = document.getElementById("mobile-nav");
var darkModeBtn = document.getElementById("dark-mode");
var darkModeLarge = document.getElementById("large-dark-mode");

/* When the list icon on mobile devices is clicked, it toggles the show class
 for the mobile nav. */
btn.addEventListener("click", function () {
    menu.classList.toggle("show");
});
  
/* when the dark mode button (found in the mobile nav) is clicked, it toggles the dark mode class
to show different page colors. */
darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

/* when the dark mode button (found underneath the header in the top right corner on tablets and laptops) is clicked, it toggles the dark mode class
to show different page colors. */
darkModeLarge.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});