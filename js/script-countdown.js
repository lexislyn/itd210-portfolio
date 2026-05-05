
/* This section creates a countdown timer on 
the donation page. */

/* makes sure the element isn't null, then runs the runClock function every second */
if (document.getElementById("fundraiser_end_date") !== null) {
    runClock();
    setInterval("runClock()",1000);
}

/* sets a fundraiser end date and then calculates the days, hours, minutes, and seconds between that end date and today. */
function runClock() {
    var thisDay = new Date();
    var fundraiserEndDate = new Date("May 22, 2026");

    document.getElementById("fundraiser_end_date").innerHTML = fundraiserEndDate.toLocaleDateString();

    var days = document.getElementById("days");
    var hours = document.getElementById("hours");
    var minutes = document.getElementById("mins");
    var seconds = document.getElementById("secs");

    var daysLeft = (fundraiserEndDate - thisDay)/(1000*60*60*24);
    var hoursLeft = (daysLeft - Math.floor(daysLeft))*24;
    var minsLeft = (hoursLeft - Math.floor(hoursLeft))*60;
    var secsLeft = (minsLeft - Math.floor(minsLeft))*60;
    
    days.textContent = Math.floor(daysLeft);
    hours.textContent = Math.floor(hoursLeft);
    minutes.textContent = Math.floor(minsLeft);
    seconds.textContent = Math.floor(secsLeft);
}