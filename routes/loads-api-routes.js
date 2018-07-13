var db = require("../models");

module.exports = function(app) {
  // gets all loads
    app.get("/api/loads", function(req,res){
        db.Loads.findAll({})
        .then(function(roles){
            res.json(roles);
        });
    });

   // find and displays loads with status unasigned
   app.get("/api/loads/status/:status", function(req,res){
        db.Loads.findAll({where:{status:req.params.status},include: [{ all: true }]})
        .then(function(Loads){
            res.json(Loads);
        });
    });

    // find and displays loads with driverstatus unasigned// THIS IS FOR ALERT MESSAGE OF CURRENT LOAD USER IS ASSIGNED 
    app.get("/api/loads/status/:current", function(req,res){
         db.Loads.findAll({where:{status:req.params.current},include: [{ all: true }]})
         .then(function(Loads){
             res.json(Loads);
         });
     });



// finds all loads including nested
//can also be for one id if you follow top example
    app.get("/api/loadsinfo", function(req,res){
        db.Loads.findAll({include: [{ all: true }]})
        .then(function(roles){
            res.json(roles);
        });
    });



 // update loads status to availble or none.
 //(NOT WORKING)

   // app.put("/api/loads/:id/assign", (req,res)=>{
   //      db.Loads.update(req.body, {where:{Status:req.body.Status}})
   //      .then(function(role){
   //          res.json(role);
   //      });
   //  });

//    task.update({
//   title: 'a very different title now'
// }).then(() => {})



   // app.put("/api/loads/:id", (req,res) =>{
   //     db.Loads.update({status: 1},{where: {phone : '09620701828'},})
   //     .then(function () {
   //          res.sendStatus(200);
   //      })
   // })

  // finds loads by id
    app.get("/api/loads/:id", function(req,res){
        db.Loads.findOne({where:{id:req.params.id}})
        .then(function(role){
            res.json(role);
        });
    });
  // creates new load to load board
    app.post("/api/loads", (req,res)=>{
        db.Loads.create(req.body)
        .then(loads=>{
            res.json(loads);
        });
    });
 // updates the load
    app.put("/api/loads", (req,res)=>{
        db.Loads.update(req.body, {where:{id:req.body.id}})
        .then(function(role){
            res.json(role);
        });
    });


 // delete load from
    app.delete("/api/loads/:id", (req,res)=>{
        db.Loads.destroy({where:{id:req.params.id}})
        .then(load=>{
            res.json(load);
        });
    });

 // assigns loads to a user
    app.post("/api/loads/assignloads", (req,res)=>{
        db.LoadsUser.create(req.body)
        .then(assignload=>{
            res.json(assignload)
        });
    });

    app.delete("/api/loads/unassignloads/:id", (req,res)=>{
        db.LoadsUser.destroy({where:{LoadId:req.params.id}})
        .then(unassignload=>{
            res.json(unassignload)
        });
    });

    app.get("/api/loadusers", function(req,res){
        db.LoadsUser.findAll({include: [{ all: true }]})
        .then(function(roles){
            res.json(roles);
        });
    });

//     // ---------------------------date search info--------------------------//




//     app.get("/api/loads/date/:date", (req,res)=>{
//         db.Loads.findAll({where:{date:req.params.date}})
//         .then(loads=>{
//             res.json(loads);
//         });
//     });

//     app.get("/api/loads/users/:usersid/date/:date", (req,res)=>{
//         db.Loads.findAll({where:{date:req.params.date,UserId:req.params.userid}})
//         .then(loads=>{
//             res.json(loads);
//         });
//     });

//     app.get("/api/loads/users/:usersid/date/:date/loads/:Loadsid", (req,res)=>{
//         db.Loads.findOne({where:{date:req.params.date,UserId:req.params.usersid,LoadsId:req.params.loadid}})
//         .then(entry=>{
//             res.json(entry);
//         });
//     });

// //     app.get("/api/loads/notactive", (req,res)=>{
// //         app.Loads.findAll({where: { status: 'unassigned'}
// // });
// //         .then(entries=>{
// //             res.json(entries);
// //         });
// //     });

//     app.get("/api/loads/users/:usersid/daterange/:startdate/:enddate", (req,res)=>{
//         db.Loads.findAll({where:{date:{between: [req.params.startdate,req.params.enddate]},UserId:req.params.userid},order:["date"]})
//         .then(loads=>{
//             res.json(loads);
//         });
//     });
}
