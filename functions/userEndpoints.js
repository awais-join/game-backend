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
