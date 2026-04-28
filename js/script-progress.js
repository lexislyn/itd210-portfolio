
/* runs the update function as the window loads. */
window.onload = update;

/* Sets the target amount to the fundraiser goal ($10,000) */
var target_amount = 10000;

//update function
function update() {
    /* finds the progress bar and turtle icon through their Ids */
    var progressBar = document.getElementById("myBar");
    var turtle = document.getElementById("turtle");

    /* Gets the donation amount from local storage and turns it into a float value. If no value is in local storage, then it uses the value $2000 (before any 
    donation is made). In this example, the fundraiser has already raised $2000 */
    var total_amount = parseFloat(localStorage.getItem("totalAmount")) || 2000;
    /* Calculates the percentage of how far we are towards the goal amount */
    var percentage = (total_amount/target_amount)*100;
    /* caps the percentage at 100 so that the bar can't overfill */
    percentage = Math.min(percentage, 100);
    /*  AI Assistance Citation: 
        Date: 4/25/2026
        Where used: The following if statement
        What AI did: Suggested that instead of trying to move the turtle icon with different keyframe animations, that instead
        I should just move it to a different position with a transition depending on which percentage it reached. 
        What I did: Define which percentages the turtle moves at, and the px difference that the turtle needs to move based off of its starting point.
        Prompt summary: How do I get the turtle icon to actually move when the bar increases? What error am I making?
        
        Moves the turtle up the progress bar as certain percentages are reached. Uses 
        transitions so that the turtle moves smoothly. */
    if (percentage === 100) {
        turtle.style.bottom = 350 + "px";
        turtle.style.transition = "bottom 2s ease";
    } else if (percentage >= 75) {
         turtle.style.bottom = 252.5 + "px";
         turtle.style.transition = "bottom 2s ease";
    } else if (percentage >= 50) {
       turtle.style.bottom = 155 + "px";
       turtle.style.transition = "bottom 2s ease";
    } else if (percentage >= 25) {
        turtle.style.bottom = 57.5 + "px";
        turtle.style.transition = "bottom 2s ease";
    }
    /* Changes the text in the progress bar to show current percentage (with 0 decimal points) and current amount raised using USD currency styles and 2 decimal points. */
    progressBar.textContent = percentage.toFixed() + "% (" + total_amount.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2}) + ")";
    /* Changes the height of the progress bar to current percentage to show change */
    progressBar.style.height = percentage + "%";
}

