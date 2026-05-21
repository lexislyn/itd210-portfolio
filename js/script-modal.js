       /*script for modal */

        /* getting all the elements we need */
        var modal = document.getElementById("modal");
        var links = document.getElementsByClassName("calendar");
        var closeBtn = document.getElementsByClassName("close")[0];
        var formView = document.getElementById("form-view");
        var submitView = document.getElementById("submit-view")
        var calendarButton = document.getElementById("calendar-file");

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

        // When the button is clicked, generate and download the ICS file
        calendarButton.addEventListener("click", function() {
            // Get the currently selected day from your modal
            var dayIndex = document.querySelector(".modal-header span#day").textContent.replace(/\D/g,''); //remove all non-digit characters.
            var event = dayEvent[dayIndex]; // Your existing dayEvent object
            var name = document.getElementById("f-name").value; // Use the user's name

            if (!event) return; // safety check

            /* Generate ICS content
            BEGIN:VCALENDAR & END:VCALENDAR: //marks this as a calendar file.
            VERSION:2.0 //standard ICS version.
            PRODID //identifies the software that generated the calendar (you can customize this).
            BEGIN:VEVENT & END:VEVENT //defines a single calendar event.
            UID:${uid} //unique ID for the event.
            DTSTAMP  //timestamp for when the event was created. Converts JS date to UTC format without dashes/colons, which ICS expects.
            DTSTART //event start time in UTC (from event.start).
            DTEND //event end time in UTC.
            SUMMARY  //the event title.
            DESCRIPTION //we personalize it with Thank you ${name} for signing up!.
            LOCATION //event location.
            .trim() just removes any leading/trailing whitespace.
            
            Other fields are added to make it work better with iPhones
            */
            var icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:-//CoastalProtectionInitiative//EventCalendar//EN
BEGIN:VEVENT
UID:${Date.now()}@example.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').split('.')[0]}Z
DTSTART:${new Date(event.start).toISOString().replace(/[-:]/g,'').split('.')[0]}Z
DTEND:${new Date(event.end).toISOString().replace(/[-:]/g,'').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:Thank you ${name} for signing up!
LOCATION:${event.location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`.trim();

            /* Use a Blob to trigger download
            Doesn't work well on safari for iPhones
            var blob = new Blob([icsContent], { type: 'text/calendar' });  //tells the browser “this is a calendar file”
            var link = document.createElement("a");
            link.href = URL.createObjectURL(blob);  //this link points to our Blob file in memory
            link.download = `${event.title.replace(/\s/g,'-')}.ics`; //when the user clicks, save it with this filename”
            link.click();
            URL.revokeObjectURL(link); // frees memory */

            var blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });

            var url = URL.createObjectURL(blob);

            /* Create a temporary link */
            var a = document.createElement("a");
            a.href = url;
            a.download = `${event.title.replace(/\s/g,'-')}.ics`;

            /* MUST be added to DOM for iOS */
            document.body.appendChild(a);

            a.click();

            document.body.removeChild(a);

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);
        });