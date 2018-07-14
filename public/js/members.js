
$(document).ready(function() {
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
        $.get("api/loads/status/false")
        .then(loads=>{
            console.log("got all loads",loads)
            loads.forEach(load =>{
                var $format= $("<div class='contact row'>"
                +"<div class='col-sm-3' style='margin-top:24px;'>"
                +"<div class=''>"

                     +"<div class='row'>" +  "<h4 class='fa fa-info-circle fa-2x' aria-hidden='true' style='font-size: 20px;'> Info </h4>"+ "</div>"
                     +"<div class='row'>" +"Product: "+ load.product +"</div>"
                     +"<div class='row'>"+"Weight: "+ load.Weight +"</div>"
                     +"<div class='row'>"+"Rate: "+ load.Rate +"</div>"

                +"</div>"
                +"</div>"
                  //pick up address
                    +"<div class='col-sm-3' style='margin-top:24px;'>"
                    +"<div class=''>"

                         +"<div class='row'>" +  "<h4 class='fa fa-location-arrow fa-2x' aria-hidden='true' style='font-size: 20px;'> Origin </h4>"+ "</div>"
                         +"<div class='row'>" + load.DropOffAdress +"</div>"
                         +"<div class='row'>"+ load.PickUpCity + ", "+ load.PickUpState + " " + load.PickUpZip +  "</div>"

                    +"</div>"
                    +"</div>"
                  // drop off address
                  +"<div class='col-sm-3' style='margin-top:24px;'>"
                  +"<div class=''>"
                       +"<div class='row'>" +  "<h4 class='fa fa-map-marker fa-2x' aria-hidden='true' style='font-size: 20px;'> Destination </h4>"+ "</div>"
                       +"<div class='row'>" + load.DropOffAdress +"</div>"
                       +"<div class='row'>"+ load.DropOffCity + ", "+ load.DropOffState + " " + load.DropOffZip +  "</div>"

                  +"</div>"
                  +"</div>"
                    // contact
                    +"<div class='col-sm-3' style='margin-top:24px;'>"
                    +"<div class=''>"
                         +"<div class='row'>" + "<h4 class='fa fa-address-card-o fa-2x' aria-hidden='true' style='font-size: 20px;'> Contact </h4>"+ "</div>"
                         +"<div class='row'>"+load.PickUp +"</div>"
                         +"<div class='row'>"+ "Email: " + load.Dropoff +"</div>"
                         +"<div class='row'>"+"Phone: "+ load.Phone +"</div>"

                    +"</div>"
                    +"</div>"

                 +"</div>");
                var $entryRow = $("<tr>");
                $entryRow.append($("<td>").text(load.name))
                    .append($("<td>").text(load.Company))
                    .append($("<td>").text(load.LoadNumber))
                    .append($("<td>").text(load.PickUpCity+", "+" "+load.PickUpState.toUpperCase()))
                    .append($("<td>").text(load.DropOffCity+", "+" "+load.DropOffState.toUpperCase()))
                    .append($("<td>").text(load.Weight))
                    .append($("<td>").text(load.Rate))
                    .append($("<td>").append("<button class='btn btn-info'>+</button>"))
                var $childRow = $('<tr class="child">')
                $childRow.append($('<td colspan="12">').append($($format))).hide()




                $entryRow.appendTo("tbody");
                $childRow.appendTo("tbody");

             });


        });
    });
});
