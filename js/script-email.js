/* This section creates a toggle effect for a submit button within a form element asking
users for their email address. */
/* AI Assistance Citation: 
Date: 4/6/2026
Where used: In the anonymous function that is called when the submit button is clicked.
What AI did: Taught me what the checkValidity() and reportValidity() methods do. I used them to
make sure that the email addresses entered were valid. It also taught me that I needed the preventDefault() 
method to prevent the page from refreshing when the submit button is clicked.
What I did: I implemented the toggle feature so that the active class is switched on and off 
and made sure that the text and values changed according to the state of the active class. 
Prompt summary: How to check if an email input is valid and how to prevent the page from
refreshing when the submit button is clicked. */

// Get the elements from their Id
var email = document.getElementById("email");
var submit = document.getElementById("sub");
var message = document.getElementById("message");

// Add an event listener to the submit button that listens for a click
submit.addEventListener("click", function(e) {
           
    // Prevents the page from refreshing when the submit button is clicked.
    e.preventDefault();
        
    // Check if the email input is valid 
        if (email.checkValidity() === false) {
            email.reportValidity();
            return;
        }

    /* Toggles the active class when the button is clicked. 
    If active, it becomes inactive and vice versa */
        submit.classList.toggle("active");
            
    // Check if submit is active or not and change values accordingly
        if (submit.classList.contains("active")) {
            message.textContent = "Thank you for subscribing!";
            submit.value = "Subscribed!";
        } else {
            message.textContent = "";
            submit.value = "Click to Subscribe!";
            email.value = "";
        } 
});
