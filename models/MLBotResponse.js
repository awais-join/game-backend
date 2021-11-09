module.exports = (sequelize, type) => {
    return sequelize.define('mlbotresponse', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mainSchool: {
            type: type.STRING,
            field: 'main_school'
        },
        mainSchoolCourse: {
            type: type.STRING,
            field: 'main_school_course'
        },
        comparisonSchool: {
            type: type.STRING,
            field: 'comparison_school'
        },
        match: {
            type: type.STRING,
            field: 'match'
        },
        eval: {
            type: type.STRING,
            field: 'eval'
        },
        contactHours: {
            type: type.INTEGER,
            field: 'contact_hours'
        },
        outcome: {
            type: type.STRING,
            field: 'outcome'
        },
    });
}