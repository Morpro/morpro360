module.exports = function(sequelize, DataTypes) {
  var Address= sequelize.define("Address", {
    // Giving the Author model a name of type STRING
   //DO = drop off  example DOadress
   "PUadress":DataTypes.STRING,
   "PUcity": DataTypes.STRING,
   "PUzipcode": DataTypes.STRING,
   "PUstate": DataTypes.STRING,
   "DOadress": DataTypes.STRING,
   "DOcity": DataTypes.STRING,
   "DOzipcode": DataTypes.STRING,
   "DOstate": DataTypes.STRING
  });

     Address.associate = function(models) {
       // Address.hasMany(models.Loads, { as: 'loadAdress' });
     // Address.belongsTo(models.loads,  { as: 'loadAddress', foreignKey: 'AddressId' })
       // Address.belongsTo(models.loads, {through:'LoadAdress'});
     // Address.belongsTo(models.Loads);
   };


  return Address;
};
