module.exports = (sequelize, type) => {
    return sequelize.define('roles', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_name: {
            type: type.STRING,
            field: 'role_name'
        }
    });
}