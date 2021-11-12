const {addGame, getAllGames} = require("../lib/db");

module.exports.saveNewGame = async (event) => {
  const body = event.body;
  console.log('this is the body i received updated string: ', body.name);
  try {
    const response = await addGame(body.name);
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

module.exports.getAllGames = async (event) => {
  try {
    const response = await getAllGames();
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
    console.log('Exception occurred in getAllGames in gameEndpoints.js: ', error);
  }
}
