const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define('leaderboard', {
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
      }
    },
    {
      createdAt: 'time',
      updatedAt: 'updateTimestamp'
    }
  );
};
