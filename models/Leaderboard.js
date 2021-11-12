const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define('leaderboard_entries', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'leaderboard_id',
      },
      gameID: {
        type: DataTypes.INTEGER,
        field: 'game_id',
        allowNull: false,
      },
      timesPlayed: {
        type: DataTypes.INTEGER,
        field: 'times_played',
        allowNull: false,
        defaultValue: 1
      },
      userSubId: {
        type: DataTypes.STRING,
        field: 'user_sub_id',
        allowNull: false,
      }
    },
    {
      createdAt: 'time',
      updatedAt: 'updateTimestamp',
      freezeTableName: true
    }
  );
};
