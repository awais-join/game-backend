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
      playsLeft: {
        type: DataTypes.INTEGER,
        field: 'plays_left',
        allowNull: false,
        defaultValue: 1
      },
      userSubId: {
        type: DataTypes.STRING,
        field: 'user_sub_id',
        allowNull: false,
      },
      time: {
        type: DataTypes.INTEGER,
        field: 'time',
        allowNull: true
      },
    },
    {
      createdAt: 'createdTimestamp',
      updatedAt: 'updateTimestamp',
      freezeTableName: true
    }
  );
};
