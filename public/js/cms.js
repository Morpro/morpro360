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

    function successPost (callback) {
      $("#alert .msg").text();
      $("#alert").fadeIn(500);
      $("#alert").fadeOut(4500);

    }

    loadUserOptions(loadUnassignloadOptions);
    loadloadOptions();



    $.get("/api/currentuserid")
    .then(id=>{

        $.get("/api/users/"+id+"/roles")
        .then(roles=>{

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



        // GOT TO BE ABLE TO ASSIGN   
        $("tbody").empty();
        $("#total").text(0);
        $.get("/api/currentuserid")
            .then(id=>{
            console.log(id)
                $.get("/api/cms")
                 .then(customers=>{
                    console.log(customers)
                    customers.forEach(customer =>{
                        var $entryRow = $("<tr>");
                        $entryRow.append($("<td>").text(customer.id))
                            .append($("<td>").text(customer.Company))
                            .append($("<td>").text(customer.contact_Name))
                            .append($("<td>").text(customer.email))
                            .append($("<td>").text(customer.phone))
                            .append($("<td>").text(customer.payment))
                            .append($("<td>").text(customer.Notes))
                             $entryRow.appendTo("tbody");
                    });

                // $.get("/api/users/"+ id + "/loads")
                // .then(loads=>{
                //     console.log(loads);
                //     var total = [];
                //     loads.forEach(load=>{
                //         total.push(load.Rate)
                //         console.log("totalcon", total)
                //         })
                //    var sum = total.reduce((x, y) => x + y);
                //    console.log("here is the sum:",sum);
                //    $("#total").text(sum)
                //
                //
                //     })
                 })




            });



     //Create new customer Puts into Database
    $("#create-cms-form").submit(event=>{
        event.preventDefault();
        $.post("/api/cms", {
             Company :$("#Company").val(),
             contact_Name :$("#contact_Name").val(),
             email : $("#email").val(),
             phone : $("#phone").val(),
             payment :$("#payment").val(),
             Notes : $("#Notes").val()
        }).then(successPost)
        console.log("created new customer")
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
