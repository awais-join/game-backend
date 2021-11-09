module.exports = (sequelize, type) => {
    return sequelize.define('provider', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        position: {
            type: type.STRING,
            field: 'position'
        },
        organization: {
            type: type.STRING,
            field: 'organization'
        },
        organweb: {
            type: type.STRING,
            field: 'organweb'
        },
        organaccbody: {
            type: type.STRING,
            field: 'organaccbody'
        },
        participants: {
            type: type.STRING,
            field: 'participants'
        }
    });
}