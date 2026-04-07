"use strict";
/* 

Comments 

*/

/* This section creates a countdown timer on the donation page. */
if (document.getElementById("fundraiser_end_date") !== null) {
    runClock();
    setInterval("runClock()",1000);
}

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

// This section creates a monthly calendar of events on the events page.
var thisDay = new Date();

// array that holds the events for the month
var dayEvent = new Array();
dayEvent[1] = "<br>Volunteer Training<br>5 pm";
dayEvent[2] = "";
dayEvent[3] = "";
dayEvent[4] = "<br>Fundraising Gala<br>6 pm";
dayEvent[5] = "";
dayEvent[6] = "";   
dayEvent[7] = "<br>Volunteer Wetland Restoration<br>10 am";
dayEvent[8] = "";
dayEvent[9] = "";
dayEvent[10] = "<br>Community Meeting<br>7 pm";
dayEvent[11] = "";
dayEvent[12] = "<br>5k Run<br>8 am";
dayEvent[13] = "";
dayEvent[14] = "";
dayEvent[15] = "";
dayEvent[16] = "<br>Volunteer Tree Planting<br>12 pm";
dayEvent[17] = "";
dayEvent[18] = "";
dayEvent[19] = "";
dayEvent[20] = "<br>Documentary Screening<br>6 pm";
dayEvent[21] = "";
dayEvent[22] = "";
dayEvent[23] = "";
dayEvent[24] = "";
dayEvent[25] = "<br>Volunteer Beach Cleanup<br>10 am";
dayEvent[26] = "";
dayEvent[27] = "";
dayEvent[28] = "<br>Guest Speaker<br>7 pm";
dayEvent[29] = "";
dayEvent[30] = "";
dayEvent[31] = "";

//runs the createCalendar function
document.getElementById("calendar").innerHTML = createCalendar(thisDay);

// creates a table that acts as a calendar
function createCalendar(calDate){
    var calendarHTML = "<table id='calendar'>";
    calendarHTML += calCaption(calDate);
    calendarHTML += calDayRows();
    calendarHTML += calDays(calDate);
    calendarHTML += "</table>";
    return calendarHTML;
}

// writes the caption for the table
function calCaption(calDate) {
    var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return "<caption>" + monthName[calDate.getMonth()] + " " + calDate.getFullYear() + "</caption>";
}

function calDayRows() {
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var rowHTML = "<tr>";
    for (var i = 0; i < day.length; i++) {
        rowHTML += "<th class='calendar-day'>" + day[i] + "</th>";
    }
    rowHTML += "</tr>";
    return rowHTML;
}

function daysInMonth(calDate) {
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var thisYear = calDate.getFullYear();
    var thisMonth = calDate.getMonth();

    // Account for leap years 
    if (thisYear % 4 === 0){
        if ((thisYear % 100 !=  0) || (thisYear % 400 === 0)){
            daysInMonth[1] = 29;
        }
    }
    return daysInMonth[thisMonth];
}

function calDays(calDate) {
    var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
    var dayOfWeek = day.getDay();
    var today = calDate.getDate();
    var rowHTML = "<tr>";
    for (var i = 0; i < dayOfWeek; i++){
        rowHTML += "<td></td>";
    }
    var totalDays = daysInMonth(calDate);
    for (var i = 1; i <= totalDays; i++) {
        day.setDate(i);
        dayOfWeek = day.getDay();
        if (dayOfWeek === 0) {
            rowHTML += "<tr>";
        }
        if ( i === today) {
            rowHTML += "<td class='calendar_dates' id='active'>" + i + dayEvent[i] +"</td>"
        } else {
            rowHTML += "<td class='calendar_dates'>" + i + dayEvent[i] + "</td>";
        }
        if (dayOfWeek === 6) {
            rowHTML += "</tr>";
        }
    }
    return rowHTML;
}