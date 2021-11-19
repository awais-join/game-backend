const {allEntriesForEndpoint, saveCurrentEntry} = require("../lib/db");

module.exports.getAllEntries = async (event) => {
  try {
    const response = await allEntriesForEndpoint(event.pathParameters.gameID) || [];
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
    }
  } catch (error) {
    console.log('Exception occurred in getAllEntries in leaderboard.endpoint.js: ', error);
  }
}

module.exports.postCurrentEntry = async (event) => {
  const body = JSON.parse(event.body);
  try {
    const response = await saveCurrentEntry({
      userSubId: event.requestContext.authorizer.claims.sub,
      playsLeft: body.playsLeft,
      gameID: body.gameID,
      time: body.time
    });
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Accept": '*/*',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(response)
    }
  } catch (error) {
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
}
