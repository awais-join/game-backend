const AWS = require('aws-sdk');
const cognitoidentityserviceprovider =  new AWS.CognitoIdentityServiceProvider();

module.exports.getReferralLinkOfUser = async (event) => {
  try {
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Accept": '*/*',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({userSubId: event.requestContext.authorizer.claims.sub})
    }
  } catch (error) {
    console.log('Exception occurred in getReferralLinkOfUser in userEndpoints.js: ', error);
  }
}

module.exports.addReferral = async (event, context) => {

  const user = await cognitoidentityserviceprovider.adminGetUser({
      UserPoolId: 'us-east-1_3tC8EgTLQ',
      Username: event.pathParameters.id,
    }).promise()

  var triesLeft = user.UserAttributes.filter(function (el) {
      return el.Name === "custom:tries_left";
    })[0].Value;

  var refferedcount = user.UserAttributes.filter(function (el) {
      return el.Name === "custom:reffered_user_count";
    })[0].Value;

    const response = await cognitoidentityserviceprovider
        .adminUpdateUserAttributes({
            UserAttributes: [{
              Name: 'custom:tries_left',
              Value: parseInt(triesLeft) + 3 + ""
            },
            {
              Name: 'custom:reffered_user_count',
              Value: parseInt(refferedcount) + 1 + ""
            }],
            UserPoolId: 'us-east-1_3tC8EgTLQ',
            Username: event.pathParameters.id
        })
        .promise();

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
};
