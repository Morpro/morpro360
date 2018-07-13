$(document).ready(function() {



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


      $.get("/api/users/"+id+"/loads")
				.then(loads=>{
					var allLoads = [];
					loads.forEach(load=>{
							allLoads.push(loads)
							console.log("here are the users load", loads.last())
							})

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
