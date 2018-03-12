# CalendarProject
Learning Google Calendar API and NodeJS


This project works off of localhost:3000
Known Issues:
    The app adds it's own calendar to your Google Calendar that everything is done through that calendar

App can be used RESTfully.
Ex: /api/check/events?timeMin=2018-02-26T18%3A00%3A00.000Z&timeMax=2018-03-04T04%3A00%3A00.000Z&timeZone=-05%3A00
    adds timeMin and timeMax and timeZone to check events

Ex: /api/search/events?q=&timeMin=2018-03-02T18%3A00%3A00.000Z&timeMax=2018-03-03T04%3A00%3A00.000Z&singleEvents=false
    adds q or the name of the event, timeMin, timeMax, and singleEvents = false.
    
Ex: 
localhost:3000/calendar -- brings you to the calendar page showing all events on this projects calendar.
localhost:3000 --brings you to the Add Event page. Which when you enter the information adds it to your Google Calendar.

localhost:3000/addEvents.ejs --does the same as localhost:3000

localhost:3000/search --brings you to the Search Event page.

localhost:3000/checkFree --brings you to the Check Availability page.
