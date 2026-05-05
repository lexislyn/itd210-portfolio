       /*script for modal */

        /* getting all the elements we need */
        var modal = document.getElementById("modal");
        var links = document.getElementsByClassName("calendar");
        var closeBtn = document.getElementsByClassName("close")[0];
        var formView = document.getElementById("form-view");
        var submitView = document.getElementById("submit-view")
        
        // When the user clicks on a link in the calendar, open the modal
        for (var i = 0; i < links.length; i++){
            links[i].addEventListener("click", loadModal);
        }

        /* this function loads the modal. */
        function loadModal(e){
            /* prevents page from refreshing */
            e.preventDefault();
            modal.style.display = "block";
            /* uses the current target's (the clicked link) dataset attributes to get information about the event  */
            var day = e.currentTarget.dataset.date;
            /* uses the dayEvent array defined is script-calendar.js and the date to find matching event information */
            document.getElementById("event").textContent = dayEvent[e.currentTarget.dataset.date].title;
            document.getElementById("month").textContent = document.getElementsByTagName("caption")[0].dataset.month;
            document.getElementById("day").innerHTML = ordinalNumber(day);
            document.getElementById("time").textContent = dayEvent[e.currentTarget.dataset.date].time;
            /* displays the form and hides the submission text */
            formView.style.display = "block";
            submitView.style.display = "none";
        }

        /* function that takes the day number and adds the correct ordinal suffix to it */
        function ordinalNumber(day){
            switch (day) {
                case "1": return day + "<sup>st</sup>";
                case "2": return day + "<sup>nd</sup>";
                case "3": return day + "<sup>rd</sup>";
                case "21": return day + "<sup>st</sup>";
                case "22": return day + "<sup>nd</sup>";
                case "23": return day + "<sup>rd</sup>"; 
                case "31": return day + "<sup>st</sup>";
                default: return day + "<sup>th</sup>";
            }
        }
        // Closes the modal when the user clicks the close button (an x on the screen)
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }

        /* AI Assistance Citation: 
           Date: 4/29/2026
           Where used: the function below
           What AI did: Suggested that I add an event handler where if I clicked anywhere in the window that wasn't 
           the modal,it would close the modal. 
           What I did: I modified the modal.style.display to none. It taught me that to do this I needed an 
           event handler attached to the window, and that by using event.target == modal, that it's targeting the overlay layer of the modal, 
           not the modal child elements (like the input or any buttons). 
           Prompt summary: How to improve this modal? */

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        /* adds an event listener to the modal form submission. */
        document.querySelector("form.register").addEventListener("submit", function(e) {
            /* prevents page from refreshing when submitted */
            e.preventDefault();
            /* doesn't display the form anymore and instead submits the submission text */
            formView.style.display = "none";
            submitView.style.display = "block";
        });


