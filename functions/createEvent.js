const { createNewEvent } = require("../lib/db");

module.exports.handler = async function createEvent(event) {
    const body = JSON.parse(event.body);

    var group = {
        name: body.name,
        type: body.type,
        start_time: body.start_time,
        end_time: body.end_time,
        groupId: body.groupId
    }

    try {
        const response = await createNewEvent(group)

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