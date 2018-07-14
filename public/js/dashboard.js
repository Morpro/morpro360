$(document).ready(function() {


function totalincome (callback) {
	var totalin = $("#grosssales").text();
	console.log(totalin);

}


totalincome ();

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


// gets users total gross income
				$.get("/api/users/"+ id + "/loads")
				.then(loads=>{
						console.log(loads);
						var total = [];
						var allLoads =[];



						loads.forEach(load=>{
							 allLoads.push(load)
							  console.log("test", allLoads);

								total.push(load.Rate)
								console.log("totalcon", total)
								})
					 var sum = total.reduce((x, y) => x + y);
					 var savings = (sum *  0.30)
					 var Totalincome = (sum  + 1700)

					 console.log("here is the sum:",sum);
					 $("#gross").text("$"+sum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
					  $("#grosssales").text("$"+sum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
						$("#income").text("$"+Totalincome.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
					 $("#savings").text("$"+savings.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));


           console.log("savinf",savings)
						})



						// gets users expense
						$.get("api/expense")
										.then(loads=>{
												console.log(loads);
												var extotal = [];
												loads.forEach(load=>{extotal.push(load.expenseAmount)})
												var sum1 = extotal.reduce((x, y) => x + y);
		                    console.log("here is the sum expense :", sum1);
		                    $("#MonthlyEx").text("$"+sum1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))


						})






// gets all user loads and counts them
				$.get("/api/users/"+id+"/loads")
					.then(loads=>{
						var allLoads = [];
						loads.forEach(load=>{
								allLoads.push(loads)
								console.log("all user completed loads", loads.length)
								})

						  $("#completedLoads").text(allLoads.length)

							// console.log("her is user completed", allLoads.length)

					})







         $.get("/api/users/"+id)
        .then(user=>{
            $("#username").text(user.firstName + " " + user.lastName);
            console.log(user.firstName)
        });
        // Counts all Loads
        $.get("api/loads/status/1")
                .then(loads=>{
                    console.log(loads);
                    var total = [];
                    loads.forEach(load=>{total.push(load.Rate)})
                   var sum = total.length
                   console.log("here is the number in array",sum);
                   $("#availableLoads").text(sum)


        })

				

        // get all loads for that user

        $.get("api/loads/status/false")
                .then(loads=>{
                    console.log(loads);
                    var total = [];
                    loads.forEach(load=>{total.push(load.Rate)})
                   var sum = total.length
                   console.log("here is the number in array",sum);
                   $("#availableLoads").text(sum)
        })





    })
  })
