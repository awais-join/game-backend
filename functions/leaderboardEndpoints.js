const {allEntriesForEndpoint, saveCurrentEntry} = require("../lib/db");

module.exports.getAllEntries = async (event) => {
  try {
    const response = await allEntriesForEndpoint(event.pathParameters.gameID);
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
      user: event.requestContext.authorizer.claims.sub,
      timesPlayed: body.timesPlayed,
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
    console.log('Exception occurred in postCurrentEntry in leaderboard.endpoint.js: ', error);
  }
}

module.exports.helloWorldCallback = async (event) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Accept": '*/*',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({message: "hello world", description :"does this require authorization token yet? yes htis is working corec"})
  }
}
