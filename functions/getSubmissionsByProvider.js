const { getSubmissionsByProviderId } = require("../lib/db");
const { decodeToken } = require("../lib/utils");

module.exports.handler = async function getSubmissionsByProvider(event) {
    const body = JSON.parse(event.body);

    const userObj = await decodeToken(event.headers.Authorization);

    return getSubmissionsByProviderId(userObj.providerId)
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