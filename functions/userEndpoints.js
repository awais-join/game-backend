const {getMyReferralLink} = require("../lib/db");

module.exports.getReferralLinkOfUser = async (event) => {
  // can decode the user email from JWT TOKEN :D
  const response = {
    statusCode: 200,
    body: JSON.stringify({
        "refferal-token": event.requestContext.authorizer.claims.sub
    }),
  };

  return response;
}
