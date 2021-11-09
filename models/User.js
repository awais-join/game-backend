module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: type.STRING,
            field: 'first_name'
        },
        last_name: {
            type: type.STRING,
            field: 'last_name'
        },
        email: {
            type: type.STRING,
            field: 'email'
        },
        phone: {
            type: type.STRING,
            field: 'phone'
        },
        passwordHash: {
            type: type.STRING,
            field: 'passwordHash'
        }
    });
}