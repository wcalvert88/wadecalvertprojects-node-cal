function setEventId(that) {
  console.log("this", that);
  console.log("this parent parent", that.parent().parent());
  var parentDiv = that.parent().parent();
  console.log("parentDiv", parentDiv);
  console.log("parentDiv.span stuff", parentDiv.find("span").text());
  eventId = parentDiv.find("span").text();
  console.log(eventId);
  eventId = eventId.trim().split("").join("");
  return eventId
}

$(document).ready(function () {
  $(".resultsDelete").click(function () {
    setEventId($(this));
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
  })
});