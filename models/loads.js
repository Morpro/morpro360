module.exports = function(sequelize, DataTypes) {
  var Loads= sequelize.define("Loads", {
    // Giving the Author model a name of type STRING
    "name": DataTypes.STRING,
    "Company": DataTypes.STRING,
    "LoadNumber": DataTypes.STRING,
    "PickUp": DataTypes.STRING,
    "Dropoff": DataTypes.STRING,
    "Weight": DataTypes.STRING,
    "Rate": DataTypes.INTEGER,
    "DriverStatus": DataTypes.STRING,

    "product": DataTypes.STRING,
    "PickUpAdress" : DataTypes.STRING,
    "PickUpCity":DataTypes.STRING,
    "PickUpZip":DataTypes.STRING,
    "PickUpState":DataTypes.STRING,

    "DropOffAdress":DataTypes.STRING,
    "DropOffCity":DataTypes.STRING,
    "DropOffZip":DataTypes.STRING,
    "DropOffState":DataTypes.STRING,
    "PickUpNumber":DataTypes.STRING,
    "Phone":DataTypes.STRING,


    "Status": {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false}
  });



     Loads.associate = function(models) {
     Loads.belongsToMany(models.User, {through:'LoadsUser'});
     Loads.belongsTo(models.Address,{as:'loadAdress', foreignKey:'AddressId'}  );
     // Loads.belongsToMany(models.Address, {through:'LoadsUser'});
     // Loads.belongsToMany(models.Address, {through:'LoadAdress'});

   };


  return Loads;
};
