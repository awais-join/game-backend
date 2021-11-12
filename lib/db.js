const connectToDatabase = require('./connection')

module.exports.allEntriesForEndpoint = async (gameID) => {
  try {
    const {LeaderBoard} = await connectToDatabase();
    return await LeaderBoard.findAll({
      where: {gameID: gameID},
      order: [
        ['times_played', 'ACS'],
        ['time', 'ACS'],
      ]
    });
  } catch (error) {
    console.log('Exception occurred in allEntriesForEndpoint in db.js: ', error);
  }
};

module.exports.saveCurrentEntry = async ({userSubId, timesPlayed,gameID}) => {
  try {
    const {LeaderBoard} = await connectToDatabase();
    return await LeaderBoard.create({
      userSubId: userSubId,
      timesPlayed: timesPlayed,
      gameID: gameID
    })
  } catch (error) {
    console.log('Exception occurred in saveCurrentEntry in db.js: ', error);
  }
};

module.exports.addPlaysRewardForPlays = async () => {

}

module.exports.addGame = async ({gameName}) => {
  try {
    const {Game} = await connectToDatabase();
    return await Game.create({
      name: gameName
    });
  } catch (error) {
    console.log('Exception occurred in addGame in db.js: ', error);
  }
}
