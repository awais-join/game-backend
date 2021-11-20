const {allEntriesForEndpoint, saveCurrentEntry} = require("../lib/db");

const AWS = require('aws-sdk');
const cognitoidentityserviceprovider =  new AWS.CognitoIdentityServiceProvider();

module.exports.getAllEntries = async (event) => {
  try {
    const response = await allEntriesForEndpoint(event.pathParameters.gameID) || [];
    const updatedResponse = await getUpdatedResponse(response)
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Accept": '*/*',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedResponse)
    }
  } catch (error) {
    console.log('Exception occurred in getAllEntries in leaderboard.endpoint.js: ', error);
  }
}

const getUpdatedResponse = (response) => {
  const updatedResponse = response.map(async (el) => {
    const user = await cognitoidentityserviceprovider.adminGetUser({
      UserPoolId: 'us-east-1_3tC8EgTLQ',
      Username: el.userSubId,
    }).promise()

    var nickname = user.UserAttributes.filter(function (el) {
      return el.Name === "nickname";
    })[0].Value;

    return {
      ...el.dataValues,
      "nickname" : nickname
    };
  });

  return Promise.all(updatedResponse);
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
