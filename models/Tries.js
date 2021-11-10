const {DataTypes} = require("sequelize");

// weak entity
// don't know about the cognito user poo yet, need to add user later
module.exports = (sequelize) => {
  return sequelize.define({
    triesLeft: {
      type: DataTypes.INTEGER,
      defaultValue: 3, // need to ask the client,
      field: 'tries_left',
      allowNull: false
    }
  });
};
