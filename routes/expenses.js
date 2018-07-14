var db = require("../models");

module.exports = function(app) {
// gets all from data base
app.get("/api/expense", function(req,res){
    db.Expenses.findAll({include: [{ all: true }]})
    .then(function(customer){
        res.json(customer);
    });
});

// post a new customer
app.post("/api/expense", (req,res)=>{
    db.Expenses.create(req.body)
    .then(loads=>{
        res.json(loads);
    });
});

// get all user loads
app.get("/api/cmsALL", function(req,res){
    db.user_cms.findAll({include: [{ all: true }]})
    .then(function(customer){
        res.json(customer);
    });
});


};
