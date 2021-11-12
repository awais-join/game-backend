const {addGame} = require("../lib/db");

module.exports.saveNewGame = async (event) => {
  const body = event.body;
  try {
    const response = await addGame({gameName: body.gameName});
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
    console.log('Exception occurred in saveNewGame in gameEndpoints.js: ', error);
  }
};
