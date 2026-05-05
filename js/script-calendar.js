"use strict";

// This section creates a monthly calendar of events on the events page.
var thisDay = new Date();

// array that holds the events for the month
var dayEvent = {
  1: { title: "Volunteer Training", time: "5 pm" },
  4: { title: "Fundraising Gala", time: "6 pm" },
  7: { title: "Wetland Restoration", time: "10 am" },
  10: { title: "Community Meeting", time: "7 pm" },
  12: { title: "5k Run", time: "8 am" },
  16: { title: "Tree Planting", time: "12 pm" },
  20: { title: "Documentary Screening", time: "6 pm" },
  25: { title: "Beach Cleanup", time: "10 am" },
  28: { title: "Guest Speaker", time: "7 pm" }
};

//runs the createCalendar function
document.getElementById("mobile-calendar").innerHTML = createMobileCalendar(thisDay);
document.getElementById("desktop-calendar").innerHTML = createCalendar(thisDay);

// creates a table that acts as a calendar
function createCalendar(calDate){
    var calendarHTML = "<table class='desktop-calendar'>";
    calendarHTML += calCaption(calDate);
    calendarHTML += calDayRows();
    calendarHTML += calDays(calDate);
    calendarHTML += "</table>";
    return calendarHTML;
}

function createMobileCalendar(calDate){
    var calendarHTML = "<table class='mobile-calendar'>";
    calendarHTML += calCaption(calDate);
    calendarHTML += calDaysMobile(calDate);
    calendarHTML += "</table>";
    return calendarHTML;
}

// writes the caption for the table
function calCaption(calDate) {
    var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return "<caption data-month='" + monthName[calDate.getMonth()] + "'>" + monthName[calDate.getMonth()] + " " + calDate.getFullYear() + "</caption>";
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
    var totalDays = daysInMonth(calDate);
    var rowHTML = "<tr>";

    //Empty cells for start of month
    for (var i = 0; i < dayOfWeek; i++){
        rowHTML += "<td></td>";
    }
  
    for (var i = 1; i <= totalDays; i++) {
        day.setDate(i);
        dayOfWeek = day.getDay();

        var event = dayEvent[i];
        var eventHTML = "";
        if (event) {
            eventHTML = `<p><a href='#' data-date="${i}" class='calendar'> ${event.title}</a></p><p class='time'>${event.time}</p>`
        }
        if (i === today) {
            rowHTML += `<td class='calendar-dates' id='active'> ${i} ${eventHTML}</td>`;
        } else {
            rowHTML += `<td class='calendar-dates'> ${i} ${eventHTML}</td>`;
        }
        if (dayOfWeek === 6 && i!== totalDays ) {
            rowHTML += "</tr><tr>";
        }
    }
    rowHTML += "</tr>";
    return rowHTML;
}

function calDaysMobile(calDate) { 
    var weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1); 
    var dayOfWeek = day.getDay(); 
    var today = calDate.getDate(); 
    var rowHTML = ""; 
    var totalDays = daysInMonth(calDate); 
    for (var i = 1; i <= totalDays; i++) { 
        var event = dayEvent[i];
        var eventHTML = "";
        if (event) {
            eventHTML = `<p><a href='#' data-date="${i}" class='calendar'> ${event.title}</a></p><p class='time'>${event.time}</p>`
        }
        day.setDate(i); 
        dayOfWeek = day.getDay(); 
        if (i === today) { 
            rowHTML += `<tr><td class='mobile-calendar-dates' id='active'><div class='top-row'><span class='weekday'>${weekDay[dayOfWeek]}</span><span class='date'>${i}</span></div> ${eventHTML}</td></tr>`
        } else { 
            rowHTML += `<tr><td class='mobile-calendar-dates'><div class='top-row'><span class='weekday'>${weekDay[dayOfWeek]}</span><span class='date'>${i}</span></div> ${eventHTML}</td></tr>`
        } 
    } 
    return rowHTML; 
}
