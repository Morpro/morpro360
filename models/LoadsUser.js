module.exports = function(sequelize, DataTypes) {
  var LoadsUser = sequelize.define("LoadsUser", {
    // Giving the Author model a name of type STRING
    "LoadId": DataTypes.STRING,
    "UserId": DataTypes.STRING,
  });

  return LoadsUser;

  LoadsUser.associate = function(models) {
  };
};