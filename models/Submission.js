module.exports = (sequelize, type) => {
    return sequelize.define('submission', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reviewStatus: {
            type: type.STRING,
            field: 'review_status'
        }
    });
}