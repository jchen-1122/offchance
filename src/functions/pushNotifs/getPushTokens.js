const ip = require('../../components/IP_ADDRESS.json')

// [user._id] => [user.token]
// gets array of push tokens for array of user ids
export async function getPushTokens(userIDs){
    var pushTokens = []
    for (var userID of userIDs){
        var user = await getUser(userID)
        if (user.token) {
            pushTokens.push(user.token)
        }
        else{
            console.log("Could not find token for user "+user.username)
            continue
        }
    }
    return pushTokens
}

const getUser = async (userID) => {
    let response = await fetch('https://8f5d9a32.us-south.apigw.appdomain.cloud/users/id', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id : userID})
    })
    response = await response.json()
    response = response.user
    return response
}