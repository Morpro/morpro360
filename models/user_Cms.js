module.exports = function(sequelize, DataTypes) {
  var user_cms = sequelize.define("user_cms", {
    // Giving the Author model a name of type STRING
    "CmsId": DataTypes.STRING,
    "UserId": DataTypes.STRING,
  });

  return user_cms;

  user_cms.associate = function(models) {
  };
};
