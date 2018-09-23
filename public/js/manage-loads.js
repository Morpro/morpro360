
// _  _  __   __   __   __   __
// |\/| /  \ |__) |__) |__) /  \
// |  | \__/ |  \ |    |  \ \__/
//
// MorPro W-P Framework v2.0.1| Yamil Morales
// MorPro Media, LLC © 2013-2018
// Built in Florida All Rights Reserved.

$(document).ready(function(){
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
            $("#load-select").empty();
            loads.forEach(load=>{
                $("<option value='" + load.id + "'>" + load.name + "</option>")
                    .appendTo($("#load-select"));
            });
            if(!!callback) callback();
        });
    };
    function userinfo(callback) {
      $.get("/api/currentuserid")
      .then(id=>{
        $.get("/api/users/"+id)
               .then(user=>{
                   $("#loadPickUp").appendTo(user.firstName + " " + user.lastName);
                   console.log("goood",user.firstName)
                   // $("#loadPickUp").text(user.firstName + " " + user.lastName);
               });
            if(!!callback) callback();
        });
    };

    function loadUnassignloadOptions(callback) {
        $.get("/api/users/" + $("#user-unassign-select").val() + "/loads/", loads=>{
            $("#load-unassign-select").empty();
            loads.forEach(load=>{
                $("<option value='" + load.id + "'>" + load.name + "</option>")
                    .appendTo($("#load-unassign-select"));
            });
            if(!!callback) callback();
        });
    };

    function successPost (callback) {
      $("#alert .msg").text();
      $("#alert").fadeIn(500);
      $("#alert").fadeOut(4500);

    }



    loadUserOptions(loadUnassignloadOptions);
    loadloadOptions();
    userinfo();



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
            // $("#loadPickUp").text(user.firstName + " " + user.lastName);
        });

     //Create new Load Puts into Database
    $("#create-load-form").submit(event=>{
        event.preventDefault();
        $.post("/api/loads", {
             name : ($("#loadName").val()),
             Company : $("#loadCompany").val(),
             LoadNumber : parseInt($("#loadNumber").val()),
             PickUp : $("#loadPickUp").val(),
             Dropoff :$("#loadDropOff").val(),
             Phone :$("#Phone").val().replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3'),
             Weight : parseInt($("#loadWeight").val()),
             Rate : parseInt($("#loadRate").val()),
             PickUpNumber:($("#PickUpNumber").val()),
             product:$("#product").val(),
             PickUpAdress:$("#PickUpAdress").val(),
             PickUpCity:$("#PickUpCity").val(),
             PickUpZip:$("#PickUpZip").val(),
             PickUpState:$("#PickUpState").val(),
             DropOffAdress:$("#DropOffAdress").val(),
             DropOffCity:$("#DropOffCity").val(),
             DropOffZip:$("#DropOffZip").val(),
             DropOffState:$("#DropOffState").val()


        }).then(successPost)
    });
///need to assign task


$("#assign-load-form").submit(event=>{
        event.preventDefault();
        $.post("/api/loads/assignloads", {
             UserId: $("#user-select").val(),
             LoadId:$("#load-select").val()
        }).done(data=>{
            console.log(data);
            $("#assign-load-form").trigger("reset");
        });
    });

// $("#assign-load-form").submit(event=>{
//         event.preventDefault();
//         $.ajax("/api/load/assignloads", {
//             method:"POST",
//             data: {
//                 userId: $("#user-select").val(),
//                 loadsId:$("#load-select").val()
//             }
//         }).done( function(data){
//             console.log(data);
//             $("#assign-load-form").trigger("reset");
//         });
//     });


    $("#new-role-form").submit(event=>{
        event.preventDefault();
        $.post("/api/roles", {
            name:$("#new-role-name").val()
        }).done(data=>{
            console.log(data);
            $("#new-role-form").trigger("reset");
        });
    });

    $("#get-roles-button").click(event=>{
        event.preventDefault();
        $.get("/api/roles", roles=>{
            console.log(roles);
        });
    });

    $("#get-role-form").submit(event=>{
        event.preventDefault();
        $.get("/api/roles/"+$("#get-role-id").val(), role=>{
            console.log(role);
            $("#get-role-form").trigger("reset");
        });
    });

// udates the load status
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
            $("#change-role-form").trigger("reset");
        });
    });


    $("#change-role-form").submit(event=>{
        event.preventDefault();
        $.ajax("/api/roles/", {
            method:"PUT",
            data: {
                id:$("#change-role-id").val(),
                name:$("#change-role-name").val()
            }
        }).done( function(data){
            console.log(data);
            $("#change-role-form").trigger("reset");
        });
    });

    $("#delete-role-form").submit(event=>{
        event.preventDefault();
        $.ajax("/api/roles/"+$("#delete-role-id").val(),{
            method: "DELETE"
        }).done( function(data){
            console.log(data);
            $("#delete-role-form").trigger("reset");
        });
    });
});
});
