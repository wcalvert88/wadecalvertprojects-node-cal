$(document).ready(function () {
    $("searchBtn").click(function () {
        $.ajax({
            type: "POST",
            url: "/calendarPg.ejs",
            data: {
                calendarID: 'primary',
                eventName: $("#ename").value,
                eventDesc: $("#edesc").value,
                eventPlace: $("#eplace").value,
                eventSTime: $("#stime").value,
                eventEtime: $("#etime").value,
                eventSDate: $("#sedate").value,
                eventEDate: $(".edate").value,
                showNotifications: false
            },
            success: function (msg) {
                console.log("Event Added!");
            }
        })
    })
})