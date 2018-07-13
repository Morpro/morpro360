// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {

    "firstName":{
      type: DataTypes.STRING,
      allowNull: true
    },

    "lastName":{
      type: DataTypes.STRING,
      allowNull: true
    },

    "userName":{
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isAlphanumeric: true
      }
    },


    // The email cannot be null, and must be a proper email before creation
    "email": {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    "password": {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

    User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
        User.belongsToMany(models.Role, {through:'UserRole'});
        User.belongsToMany(models.Loads, {through:'LoadsUser'});
        User.hasMany(models.Ratings, {as:'UserRatings'});
        User.hasMany(models.Expenses, {as:'UserExpenses'});
        User.belongsToMany(models.Cms, {through: 'user_cms', foreignKey: 'userId' });
    };
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    console.log("Hooked before create");
  });

  User.addHook("beforeUpdate", function(user) {
    console.log("Hooked after update");
    if(!!user.password) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      console.log(user);
    }
  });
  return User;
};
