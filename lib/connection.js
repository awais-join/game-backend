const Sequelize = require('sequelize')
const UserModel = require('./../models/User')
const RoleModel = require('./../models/Role')
const ProviderModel = require('./../models/Provider')
const CourseModel = require('./../models/Course')
const SubmissionModel = require('./../models/Submission')
const UniversityModel = require('./../models/University')
const UniversitySubmissionModel = require('../models/UniversitySubmission')
const MLBotResponseModel = require('../models/MLBotResponse')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.USERNAME,
    process.env.PASSWORD, {
        dialect: 'mysql',
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
)
const User = UserModel(sequelize, Sequelize)
const Provider = ProviderModel(sequelize, Sequelize)
const Role = RoleModel(sequelize, Sequelize)
const Course = CourseModel(sequelize, Sequelize)
const Submission = SubmissionModel(sequelize, Sequelize)
const University = UniversityModel(sequelize, Sequelize)
const UniversitySubmission = UniversitySubmissionModel(sequelize, Sequelize)
const MLBotResponse = MLBotResponseModel(sequelize, Sequelize)

User.hasOne(Provider)
Role.hasOne(User)
Submission.hasMany(Course, { foreignKey: 'submission_id' })
Provider.hasMany(Submission, { foreignKey: 'provider_id' })

Submission.belongsToMany(University, {
    through: UniversitySubmission,
    as: "universities",
    foreignKey: "submission_id",
    onDelete: 'CASCADE'
});

University.belongsToMany(Submission, {
    through: UniversitySubmission,
    as: "submissions",
    foreignKey: "university_id",
    onDelete: 'CASCADE'
});

Submission.hasMany(MLBotResponse, { foreignKey: 'submission_id' })

const Models = { User, Role, Provider, Course, Submission, University, UniversitySubmission, MLBotResponse }
const connection = {}

module.exports = async() => {
    if (connection.isConnected) {
        console.log('=> Using existing connection.')
        return Models
    }

    await sequelize.sync()
    await sequelize.authenticate()
    connection.isConnected = true
    console.log('=> Created a new connection.')
    return Models
}