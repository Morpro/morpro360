function getWorkWeek(date,weekDiff) {
    if(!weekDiff) weekDiff=0;
    var startMoment = moment(date).subtract(((date.day()+6) % 7) - (7*weekDiff), "days"); //gets the latest monday + the week differential
    var endMoment = moment(startMoment).add(6,"days");
    return {start:startMoment,end:endMoment};
}

$(document).ready(function(){
    $.get("/api/currentuserid")
    .then(id=>{
        $.get("/api/users/"+id)
        .then(user=>{
            $("#username").text(user.firstName + " " + user.lastName);
        });
    });

    // var startWeek = getWorkWeek(moment());
    // $("#start-date").val(startWeek.start.format("YYYY-MM-DD"));
    // $("#end-date").val(startWeek.end.format("YYYY-MM-DD"));
    
    // $("#prev-week-button").click(event=>{
    //     var newWeek = getWorkWeek(moment($("#start-date").val(), "YYYY-MM-DD"),(-1));
    //     $("#start-date").val(newWeek.start.format("YYYY-MM-DD"));
    //     $("#end-date").val(newWeek.end.format("YYYY-MM-DD"));
    //     $("#start-date").trigger("change");
    // });

    // $("#next-week-button").click(event=>{
    //     var newWeek = getWorkWeek(moment($("#start-date").val(), "YYYY-MM-DD"),1);
    //     $("#start-date").val(newWeek.start.format("YYYY-MM-DD"));
    //     $("#end-date").val(newWeek.end.format("YYYY-MM-DD"));
    //     $("#start-date").trigger("change");
    // });

    
        $("tbody").empty();
        $("#total").text(0);
        $.get("/api/currentuserid")
            .then(id=>{
            console.log(id)
                $.get("/api/users/"+ id + "/loads")
                 .then(loads=>{
                    console.log(loads)
                    loads.forEach(load =>{  
                        var $entryRow = $("<tr>");
                        $entryRow.append($("<td>").text(load.name))
                            .append($("<td>").text(load.Company))
                            .append($("<td>").text(load.LoadNumber))
                            .append($("<td>").text(load.PickUp))
                            .append($("<td>").text(load.Dropoff))
                            .append($("<td>").text(load.Weight))
                            .append($("<td>").text(load.Rate))
                            .append($("<td>").text(load.quantity));
                             $entryRow.appendTo("tbody");
                    });

                $.get("/api/users/"+ id + "/loads")
                .then(loads=>{
                    console.log(loads);
                    var total = [];
                    loads.forEach(load=>{
                        total.push(load.Rate)
                        console.log("totalcon", total)
                        })
                   var sum = total.reduce((x, y) => x + y);
                   console.log("here is the sum:",sum);
                   $("#total").text(sum)


                    })
                 })


                
                
            });
        });
     

    $.get("/api/users")
    .then(users=>{

        users.forEach(user=>{
            $("#user-select").append("<option value='" + user.id + "'>" + user.firstName + " " + user.lastName + "</option>");
        });
        $("#user-select").trigger("change");
    });
// });