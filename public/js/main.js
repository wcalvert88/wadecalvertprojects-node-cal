
$(document).ready(function () {
    $(".resultsDelete").click(function () {
      console.log("this", $(this));
      console.log("this parent parent", $(this).parent().parent());
      var parentDiv = $(this).parent().parent().parent();
      console.log("parentDiv", parentDiv);
      console.log("parentDiv.span stuff", parentDiv.find("span").text());
      eventId = parentDiv.find("span").text();
      console.log(eventId);
      eventId = eventId.trim().split("").join("");
      console.log("new EventId", eventId);
      $.ajax({
        type: "DELETE",
        url: "./searchEvents.ejs",
        data: {
          calendarID: 'primary',
          eventId: eventId,
          showNotifications: false
        },
        success: function (msg) {
          console.log("I did it!");
        }
      });
      // cal.Events.delete('primary', parentDiv.find("span").text(), {sendNotifications: false})
      //   .then(results => {
      //     console.log('delete Event:' + JSON.stringify(results));
      //   }).catch(err => {
      //     console.log('Error deleteEvent:' + JSON.stringify(err.message));
      //   });
    })
  });