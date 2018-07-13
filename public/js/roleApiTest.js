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

    loadUserOptions(loadUnassignloadOptions);
    loadloadOptions();
    
     //Create new Load Puts into Database
    $("#create-load-form").submit(event=>{
        event.preventDefault();
        $.post("/api/loads", {
             name : parseInt($("#loadName").val()),
             Company : $("#loadCompany").val(),
             LoadNumber : parseInt($("#loadNumber").val()),
             PickUp : $("#loadPickUp").val(),
             Dropoff :$("#loadDropOff").val(),
             Weight : parseInt($("#loadWeight").val()),
             Rate : parseInt($("#loadRate").val())
        }).done(data=>{
            console.log(data);
            $("#create-load-form").trigger("reset");
        });
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