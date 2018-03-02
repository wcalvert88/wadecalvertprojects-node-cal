# CalendarProject
Learning Google Calendar API and NodeJS


This project works off of localhost:3000

localhost:3000 --brings you to the Add Event page. Which when you enter the information adds it to your Google Calendar.  Known issue: it adds it's own calendar to Google Calendar for events added through this app.

localhost:3000/calendarPg.ejs --does the same as localhost:3000

localhost:3000/search --brings you to the Search Event page.  The event name is optional but the rest is required. This will bring you to localhost:3000/searchEvents.ejs with the results.

localhost:3000/searchEvents.ejs --this will only work if something is searched.  It is the display page for the Search Event page. This page will display the results of the search with a delete button at the end of the result to use if you want to remove the result from your calendar.  Need to add an update page to the functionality so you don't have to go to your calendar to double check the delete worked.

localhost:3000/checkFree --brings you to the Check Availability page.  You have to put in the date and time range you want to check and it will bring you to the localhost:3000/checkFree.ejs page which will show you when you are busy if there is anything in that time range.

localhost:3000/checkFree.ejs --this will only work if something is searched. It is the display page for the Check Availability Page.
