module.exports = function(sequelize, DataTypes) {
  var Expenses= sequelize.define("Expenses", {
    // Giving the Author model a name of type STRING
    "expense": DataTypes.STRING,
    "expenseType": DataTypes.STRING,
    "expenseAmount": DataTypes.INTEGER,
    "reciept": DataTypes.BLOB
  });

     Expenses.associate = function(models) {

         //Loads.belongsTo
   };

  return Expenses;
};
