function setEventId(that) {
  console.log("this", that);
  console.log("this parent parent", that.parent().parent());
  var parentDiv = that.parent().parent();
  console.log("parentDiv.span stuff", parentDiv.find(".eventId").text());
  eventId = parentDiv.find(".eventId").text();
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
  var $template;
  $.ajax({
    type: "GET",
    url: "/templates/results.ejs",
    success: function(temp){
      $template = temp;
    }
  })
  $("#searchForm").submit(function (e) {
    e.preventDefault();
    // debugger;
    $.ajax({
      type: "GET",
      url: "./api/add/events",
      data: {
        q: $("#ename").val(),
        timeMin: (new Date(($("#sedate").val() + ' ' + $("#stime").val())).toISOString()),
        timeMax: (new Date($("#edate").val() + ' ' + $("#etime").val())).toISOString(),
        singleEvents: false
      },
      success: function (msg) {
        console.log("GET worked")
        console.log($template);
        // var compiledTemplate = ejs.compile($template)
        var resultsSection = ejs.render($template, msg)
        $('.resultsSection').append(resultsSection);
      }
    })
  })
});