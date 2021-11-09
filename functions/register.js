const { registerNewUser, getUserByEmail,createProvider, getProviderByUserId } = require("../lib/db");

module.exports.handler = async function registerUser(event) {
    const body = JSON.parse(event.body);

    const user = await getUserByEmail(body.email)

    if (user) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Accept": '*/*',
                "Content-Type": "application/json"
            },
            body: "User already exist with provided email!"
        };
    }

    const userRegister = await registerNewUser(body)
    
    var providerInfo = {
        position: body.position,
        organization: body.organization,
        organweb: body.organweb,
        organaccbody: body.organaccbody,
        participants: body.participants,
        userId: userRegister.id
        };
        console.log(providerInfo);

    return createProvider(providerInfo)
        .then(response => ({
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Accept": '*/*',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(response)
        }))
        .catch(err => {
            console.log({ err });
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
        });

};