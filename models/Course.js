module.exports = (sequelize, type) => {
    return sequelize.define('course', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        courseId: {
            type: type.STRING,
            field: 'course_id'
        },
        courseTitle: {
            type: type.STRING,
            field: 'course_title'
        },
        courseDescription: {
            type: type.STRING,
            field: 'course_description'
        },
        keywords: {
            type: type.STRING,
            field: 'keywords'
        },
        department: {
            type: type.STRING,
            field: 'department'
        },
        comments: {
            type: type.STRING,
            field: 'comments'
        },
    });
}