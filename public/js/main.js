// This function sets the id of the currently clicked section
// of events to the event id.  Mainly used to delete the event 
// from the calendar.
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
  // Sets the delete button on the search page to delete events.
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

  // This loads the template. So that the page will update
  // when there are search results.
  var $template;
  $.ajax({
    type: "GET",
    url: "/templates/results.ejs",
    success: function(temp){
      $template = temp;
    }
  })
  $("#searchForm").submit(function (e) {
    // This stops the form from immediately submitting to the router.
    e.preventDefault();
    // This sends the data to the api/search/events file.
    $.ajax({
      type: "GET",
      url: "./api/search/events",
      data: {
        q: $("#ename").val(),
        timeMin: (new Date(($("#sedate").val() + ' ' + $("#stime").val())).toISOString()),
        timeMax: (new Date($("#edate").val() + ' ' + $("#etime").val())).toISOString(),
        singleEvents: false
      },
      // If the request is successful it will render the ejs template with the results of the search.
      success: function (msg) {
        console.log("GET worked")
        console.log($template);
        var resultsSection = ejs.render($template, msg)
        $('.resultsSection').append(resultsSection);
      }
    })
  })

  // This takes care of the adding the event functionality.
  $("#addEventForm").submit(function(e){
    // This prevents the router from getting the data from the form immediately.
    e.preventDefault();
    // This POST's the data to the api/add/addEvents page
    $.ajax({
      type: "POST",
      url: "./api/add/addEvents",
      data: {
        "start": (new Date(($("#sedate").val() + ' ' + $("#stime").val())).toISOString()),
        "end": (new Date($("#edate").val() + ' ' + $("#etime").val())).toISOString(),
        'location': $("#eplace").val(),
        'summary': $("#ename").val(),
        "status": "confirmed",
        "description": $("#edesc").val(),
        "colorId": 1
      },
      success: function (msg) {
        console.log("POST worked")
        document.getElementById("addEventForm").reset();
      }
    })
  })

  // This is the template for the checkFree results just like the search template
  var $checkTemplate;
  $.ajax({
    type: "GET",
    url: "/templates/checkFreeTemp.ejs",
    success: function(temp){
      $checkTemplate = temp;
    }
  })
$("#checkForm").submit(function(e) {
  e.preventDefault();
  $.ajax({
    type: "GET",
    url: '/api/check/events',
    data: {
      "timeMin" : (new Date(($("#sedate").val() + ' ' + $("#stime").val())).toISOString()),
      "timeMax" : (new Date($("#edate").val() + ' ' + $("#etime").val())).toISOString(),
      "timeZone" : (-(new Date().getTimezoneOffset() / 60)).toString().split("").join("0") + ':00',
    },
    // Just like the search template except for some reason the form wouldn't reset after the search so I force it to reset.
    success: function (msg) {
      console.log("Check worked")
      console.log($checkTemplate);
      console.log("msg", msg);
      console.log("msg.results", msg.results[0]);
      console.log("msg after for loop", msg);
      var resultsSection = ejs.render($checkTemplate, msg)
      $('.resultsSection').append(resultsSection);
      document.getElementById("checkForm").reset();
    }
  })
})

});