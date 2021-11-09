const { removeUser } = require("../lib/db");

module.exports.handler = async function deleteUser(event) {
    const body = JSON.parse(event.body);

    return removeUser(body)
        .then(response => ({
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Accept": '*/*',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(response)
        }))
        .catch(err => {
            console.log({ err });
            return {
                statusCode: err.statusCode || 500,
                body: { stack: err.stack, message: err.message }
            };
        });

};