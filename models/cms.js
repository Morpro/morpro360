module.exports = function(sequelize, DataTypes) {
  var Cms= sequelize.define("Cms", {
    // Giving the Author model a name of type STRING

    "Company": DataTypes.STRING,
    "contact_Name": DataTypes.STRING,
    "email": DataTypes.STRING,
    "phone": DataTypes.STRING,
    "payment": DataTypes.STRING,
    "Notes": DataTypes.STRING

  });


     Cms.associate = function(models) {
     Cms.belongsToMany(models.User, {through: 'user_cms', foreignKey: 'CmsId' })

   };


  return Cms;
};
