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


    // create new load in server.
    $("#create-load-form").submit(event=>{
        event.preventDefault();
        var loadInput = {
         name : $("#loadName").val(),
         loadCompany : $("#loadCompany").val(),
         loadNum : parseInt($("#loadNumber").val()),
         pickUp : $("#loadPickUp").val(),
         dropOff : $("#loadDropOff").val(),
         weight : parseInt($("#loadWeight").val()),
         rate : parseInt($("#loadRate").val())
        };
        $.post("/api/loads", loadInput);
    })

    $("#assign-load-form").submit(event=>{
        event.preventDefault();
        var loadAssign = {
            UserId: $("#user-select").val(),
            LoadId:$("#load-select").val()

        };
        console.log(loadAssign.loadIds);
        console.log(loadAssign.userId);

        $.post("/api/loads/assignloads", loadAssign);
    });

    $("#unassign-load-form").submit(event=>{
        event.preventDefault();
        var loadUnassign = {
            userId: parseInt($("#user-unassign-select").val()),
            loadIds: [parseInt($("#load-unassign-select").val())]
        };

        $.post("/api/users/unassignloads", loadUnassign);
    });

    $("#user-unassign-select").change(event=>{
        event.preventDefault();
        loadUnassignloadOptions();
    });
});