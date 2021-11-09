module.exports = (sequelize, type) => {
    return sequelize.define('university_submission', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        submission_id: {
            type: type.INTEGER,
            field: 'submission_id'
        },
        university_id: {
            type: type.INTEGER,
            field: 'university_id'
        },
    });
}