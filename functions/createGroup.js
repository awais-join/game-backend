const { createNewGroup } = require("../lib/db");

module.exports.handler = async function createGroup(event) {
    const body = JSON.parse(event.body);

    var group = {
        name: body.name,
        timelineId: body.timelineId
    }

    try {
        const response = await createNewGroup(group)

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Accept": '*/*',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(response)
        };
    } catch (err) {
        console.log("ERROR: " + err)
        return {
            statusCode: err.statusCode || 500,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Accept": '*/*',
                "Content-Type": "application/json"
            },
            body: { stack: err.stack, message: err.message }
        };
    }

};