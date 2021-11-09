module.exports = (sequelize, type) => {
    return sequelize.define('university', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            field: 'name'
        }
    });
}