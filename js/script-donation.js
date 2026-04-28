
        /* gets both the form and submit button through their Ids */
        var form = document.getElementById("donation-form");
        var submitButton = document.getElementById("submit");

        /*  AI Assistance Citation: 
            Date: 4/25/2026
            Where used: to define var total_amount
            What AI did: Suggested that I define total_amount using either the local storage value or if that wasn't saved yet then 
            the value 2000. Before it suggested this, I had set total_amount to just 2000 which reset every time the submit button was clicked.
            What I did: Define the other variables and add the event Listener to the submit button.
            Prompt summary: How do I get the progress bar to actually update when I submit my form. Can you help me find my error? */ 
        var total_amount = parseFloat(localStorage.getItem("totalAmount")) || 2000;
      
        /* Adds an event listener to listen for when the submit button is clicked. Then it runs the following function. */
        submitButton.addEventListener("click", function (e) {
            /* First it prevents the default behavior of the page reloading. */
            e.preventDefault();
            /* Then it finds the amount of the donation made */
            var donation = form.elements.donationAmount.value;
            /* Converts the amount from a string to a float. */
            total_amount += parseFloat(donation);
            /* Stores the amount into local Storage so that it can be used on the media.html page */
            localStorage.setItem("totalAmount",total_amount);
            /* Gives the user a window alert thanking them for their donation. */
            window.alert("Thank you for your generous donation to our organization! We couldn't do what we do without people like you!");
            /* Takes the user back to the media.html page */
            window.location = "media.html";
        });

       