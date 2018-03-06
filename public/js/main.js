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
    debugger;
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
      url: "./api/search/events",
      data: {
        q: $("#ename").val(),
        timeMin: (new Date(($("#sedate").val() + ' ' + $("#stime").val())).toISOString()),
        timeMax: (new Date($("#edate").val() + ' ' + $("#etime").val())).toISOString(),
        singleEvents: false
      },
      success: function (msg) {
        console.log("GET worked")
        console.log($template);
        var resultsSection = ejs.render($template, msg)
        $('.resultsSection').append(resultsSection);
      }
    })
  })
  var $addTemplate;
  $.ajax({
    type: "GET",
    url: "/templates/results.ejs",
    success: function(temp){
      $addTemplate = temp;
    }
  })
  $("#addEventForm").submit(function(e){
    e.preventDefault();
    
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
        console.log("GET worked")
        document.getElementById("addEventForm").reset();
      }
    })
  })

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
    success: function (msg) {
      console.log("Check worked")
      console.log($checkTemplate);
      var resultsSection = ejs.render($checkTemplate, msg)
      $('.resultsSection').append(resultsSection);
      document.getElementById("checkForm").reset();
    }
  })
})

});