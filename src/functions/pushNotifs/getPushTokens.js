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
    let response = await fetch('http://' + ip.ipAddress + '/user/id/' + userID)
    response = await response.json()
    return response
}