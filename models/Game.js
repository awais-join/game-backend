const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("game_entries", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'game_id'
    },
    name: {
      type: DataTypes.STRING,
      field: 'game_name',
      allowNull: false,
      unique: true
    }
  }, {
    freezeTableName: true
  });
};
