
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
                    +"<div class='col-sm-3'>"
                      +"<h3> Load info </h3>"
                       
                         +"<div class='row'>load number:"+load.name+"</div>"
                         +"<div class='row'>Product:"+ load.product + "</div>"
                         +"<div class='row'>Miles:"+ load.Rate+ "</div>"
                       
                    +"</div>"
                  //pick up address
                    +"<div class='col-sm-3'>"
                    +"<div class=''>"

                         +"<div class='row'>"+"<h4>Origin</h4>"+"</div>"
                         +"<div class='row'>Adress:"+load.PickUpAdress+"</div>"
                         +"<div class='row'>Product:"+ load.PickUpCity + "</div>"
                         +"<div class='row'>Miles:"+ load.PickUpZip+ "</div>"
                         +"<div class='row'>state:"+ load.PickUpState + "</div>"
    
                    +"</div>"   
                    +"</div>"
                  // drop off address
                    +"<div class='col-sm-3'>"
                      +"<h3>Destination</h3>"
                       
                         +"<div class='row'>Adress:"+load.DropOffAdress+"</div>"
                         +"<div class='row'>Product:"+load.DropOffCity + "</div>"
                         +"<div class='row'>Miles:"+ load.DropOffZip+ "</div>"
                         +"<div class='row'>state:"+ load.DropOffState + "</div>"
    
                       
                    +"</div>"
                    // contact
                    +"<div class='col-sm-3'>"
                      +"<h3>contact</h3>"
                       
                         +"<div class='row'>Adress:"+load.DropOffAdress+"</div>"
                         +"<div class='row'>Product:"+load.DropOffCity + "</div>"
                         +"<div class='row'>Miles:"+ load.DropOffZip+ "</div>"
                         +"<div class='row'>state:"+ load.DropOffState + "</div>"
    
                       
                    +"</div>"

                 +"</div>");
                var $entryRow = $("<tr>");
                $entryRow.append($("<td>").text(load.name))
                    .append($("<td>").text(load.Company))
                    .append($("<td>").text(load.LoadNumber))
                    .append($("<td>").text(load.PickUp))
                    .append($("<td>").text(load.Dropoff))
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
