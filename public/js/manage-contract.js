$(document).ready(function() {

    function loadUserOptions(callback) {
        $.get("/api/users", users=>{
            $("#user-select").empty();
            $("#user-unassign-select").empty();
            users.forEach(user=>{
                $("<option value='" + user.id + "'>" + user.firstName + " " + user.lastName + "</option>")
                    .appendTo($("#user-select"));
                $("<option value='" + user.id + "'>" + user.firstName + " " + user.lastName + "</option>")
                    .appendTo($("#user-unassign-select"));
            });
            if(!!callback) callback();
        });
    };

    function loadloadOptions(callback) {
        $.get("/api/loads", loads=>{
            $("#loadId").empty();
            loads.forEach(load=>{
                $("<option value='" + load.id + "'>" + load.name + "</option>")
                    .appendTo($("#loadId"));
            });
            if(!!callback) callback();
        });
    };

    function loadStatusOptions(callback) {
        $.get("/api/loads", loads=>{
            $("#load-select").empty();
            loads.forEach(load=>{
                $("<option value='" + load.id + "'>" + load.name + "</option>")
                    .appendTo($("#load-select"));
            });
            if(!!callback) callback();
        });
    };

    function unLoadOptions(callback) {
        $.get("/api/loads", loads=>{
            $("#unload-select").empty();
            loads.forEach(load=>{
                $("<option value='" + load.id + "'>" + load.name + "</option>")
                    .appendTo($("#unload-select"));
            });
            if(!!callback) callback();
        });
    };

    function successPost (callback) {
      $("#alert .msg").text();
      $("#alert").fadeIn(500);
      $("#alert").fadeOut(4500);

    };

    loadStatusOptions();
    loadloadOptions();
    loadUserOptions();
    unLoadOptions();



    $('tbody').delegate('td button').click(function(e){
      e.preventDefault();
      $(e.target).parent().parent().next().toggle("slow");
      });



    // $("#user-select").on("change", event=>{


/// bottom is original code for page


    $.get("/api/currentuserid")
    .then(id=>{

        $.get("/api/users/"+id+"/roles")
        .then(roles=>{
            // console.log("Is admin:");
            // console.log(roles.find(role=>(role.name === "Admin")));
            // console.log("Is payroll:");
            // console.log(roles.find(role=>(role.name === "Payroll")));
            if(!roles.find(role=>(role.name === "Admin"))) {
                console.log("user is not an admin");
                $("#admin-link").remove();
            }
            if(!roles.find(role=>(role.name === "Payroll"))) {
                console.log("user is not a payroll");
                $("#payroll-link").remove();
            }
        });


         $.get("/api/users/"+id)
        .then(user=>{
            $("#username").text(user.firstName + " " + user.lastName);
            console.log(user.firstName)
        });

       // gets loadboard with value of true[1] or by unasigned
        $.get("api/loads/")
        .then(loads=>{
            console.log("got all loads",loads)
            loads.forEach(load =>{
                var $entryRow = $("<tr>");
                var status = (!load.Status)? "Available" : "Booked";
                var statusClass = (!load.Status)? "label-success" : "label-danger";

                $("#status").val(load.Status);

                $entryRow.append($("<td>").text(load.name))
                    .append($("<td>").text(load.Company))
                    .append($("<td>").text(load.LoadNumber))
                    .append($("<td>").text(load.PickUp))
                    .append($("<td>").text(load.Dropoff))
                    .append($("<td>").text(load.Weight))
                    .append($("<td>").text(load.Rate))
                    .append($("<td id='info'>").append("<button class='btn btn-info'>+</button>"))
                    .append($("<td>").append($("<p class='Status'>").text(status).addClass("label").addClass(statusClass)))
                    .append($("<td>").append($("<p class='Status'>").text(load.DriverStatus).addClass("label").addClass(statusClass)))


                var $childRow = $('<tr class="child">')
                $childRow.append($('<td colspan="1">').text(load.Rate)).hide()
                         .append($('<td colspan="1">').text(load.Weight)).hide()

                $entryRow.appendTo("tbody");
                $childRow.appendTo("tbody");
             });

        });

    });

    // UPDATES LOAD STATUS TO BOOKED OR Available
    $("#loadStatus").submit(event=>{
           event.preventDefault();
           $.ajax("/api/loads/", {
               method:"PUT",
               data: {
                   id:$("#loadId").val(),
                   Status:$("#status").val()
               }
           }).done( function(data){
               console.log(data);
               successPost()
               $("#change-role-form").trigger("reset");
           });
       });
   // ASSIGNS LOAD TO A USER
    $("#assign-load-form").submit(event=>{
        event.preventDefault();
        $.post("/api/loads/assignloads", {
             UserId: $("#user-select").val(),
             LoadId:$("#load-select").val()
        }).done(data=>{
            console.log(data);
            $("#assign-load-form").trigger("reset");
            successPost()
        });
    });

     //  UNASSIGNS LOAD FROM A USER
    $("#unassign-load-form").submit(event=>{
        event.preventDefault();
        $.ajax("/api/loads/unassignloads/"+$("#unload-select").val(),{
            method: "DELETE"
        }).done( function(data){
            console.log(data);
            $("#unassign-load-form").trigger("reset");
        });
    });



    $("#userToChange").on("change", event=>{
        $.get("/api/users/"+$("#userToChange").val())
        .then(user=>{
            $("#newFirstName").val(user.firstName);
            $("#newLastName").val(user.lastName);
            $("#newUserName").val(user.userName);
            $("#newEmail").val(user.email);
        });
    });


  // update and edit load info
  
    $("#user-change").submit(event=>{
        event.preventDefault();
        if(!$("#userToChange").val()) return;
        var newUser = {
            id: $("#userToChange").val(),
            firstName: $("#newFirstName").val(),
            lastName: $("#newLastName").val(),
            userName: $("#newUserName").val(),
            email: $("#newEmail").val()
        };
        if(!!$("#newPassword").val()) {
            newUser.password = $("#newPassword").val();
        }
        $.ajax("/api/users/", {
            method:"PUT",
            data: newUser
        }).done( function(data){
            $("#user-change").trigger("reset");
            populateUsers();
        });
    });






});


// // This file just does a GET request to figure out which user is logged in
// // and updates the HTML on the page
// $('#date-select').val(moment().format("YYYY-MM-DD"));
// $("#prev-date-button").click(event=>{
//     var prevDate = moment($('#date-select').val(),"YYYY-MM-DD").subtract(1,"days");
//     $("#date-select").val(prevDate.format("YYYY-MM-DD"));
//     $("#date-select").trigger("change");
// });
// $("#next-date-button").click(event=>{
//     var nextDate = moment($('#date-select').val(),"YYYY-MM-DD").add(1,"days");
//     $("#date-select").val(nextDate.format("YYYY-MM-DD"));
//     $("#date-select").trigger("change");
// });
