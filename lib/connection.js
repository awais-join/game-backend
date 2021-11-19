const Sequelize = require('sequelize');

const GameModel = require("../models/Game");
const LeaderBoardModel = require("../models/Leaderboard");

const sequelize = new Sequelize.Sequelize(
  process.env.DB_NAME,
  process.env.USERNAME,
  process.env.PASSWORD, {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

const Game = GameModel(sequelize);
const LeaderBoard = LeaderBoardModel(sequelize);

// User.hasOne(Provider)
// Role.hasOne(User)
// Submission.hasMany(Course, {foreignKey: 'submission_id'})
// Provider.hasMany(Submission, {foreignKey: 'provider_id'})
//
// Submission.belongsToMany(University, {
//   through: UniversitySubmission,
//   as: "universities",
//   foreignKey: "submission_id",
//   onDelete: 'CASCADE'
// });
//
// University.belongsToMany(Submission, {
//   through: UniversitySubmission,
//   as: "submissions",
//   foreignKey: "university_id",
//   onDelete: 'CASCADE'
// });
//
// Submission.hasMany(MLBotResponse, {foreignKey: 'submission_id'})

const Models = {Game, LeaderBoard}
const connection = {}

module.exports = async () => {
  if (connection.isConnected) {
    console.log('=> Using existing connection.')
    return Models
  }

  await sequelize.sync()
  await sequelize.authenticate()
  connection.isConnected = true
  console.log('=> Created a new connection.')
  return Models
};
