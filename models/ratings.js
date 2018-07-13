module.exports = function(sequelize, DataTypes) {
    var Ratings= sequelize.define("Ratings", {
      "Status": DataTypes.INTEGER
    });



        return Ratings;


       Ratings.associate = function(models) {

};
};
