const connectToDatabase = require('./connection')

module.exports.allEntriesForEndpoint = async (gameID) => {
  try {
    const {LeaderBoard} = await connectToDatabase();
    return await LeaderBoard.findAll({
      where: {gameID: gameID},
      order: [
        ['playsLeft', 'ASC'],
        ['time', 'ASC'],
      ]
    });
  } catch (error) {
    console.log('Exception occurred in allEntriesForEndpoint in db.js: ', error);
  }
};

module.exports.saveCurrentEntry = async ({userSubId, playsLeft, gameID, time}) => {
  try {
    const {LeaderBoard} = await connectToDatabase();
    return await LeaderBoard.create({
      userSubId: userSubId,
      playsLeft: playsLeft,
      gameID: gameID,
      time: time
    })
  } catch (error) {
    console.log('Exception occurred in saveCurrentEntry in db.js: ', error);
  }
};

module.exports.addPlaysRewardForPlays = async () => {

}

module.exports.addGame = async (name) => {
  try {
    const {Game} = await connectToDatabase();
    return await Game.create({
      name: name
    });
  } catch (error) {
    console.log('Exception occurred in addGame in db.js: ', error);
  }
}

module.exports.getAllGames = async () => {
  try {
    const {Game} = await connectToDatabase();
    return await Game.findAll();
  } catch (error) {
    console.log('Exception occurred in getAllGames in db.js: ', error);
  }
}
