const { fetchAllUniversities } = require("../lib/db");

module.exports.handler = async function getUniversities(event) {

    return fetchAllUniversities()
        .then(data => ({
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Accept": '*/*',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }))
        .catch(err => {
            console.log({ err });

            return {
                statusCode: err.statusCode || 500,
                body: { statusCode: err.statusCode || 500, message: err.message }
            };
        });
};