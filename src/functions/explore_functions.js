// gets array of user raffle objects, returns array of top 5 donors (user objects)
export function top5_raffle(users){
    const ip = require('../components/IP_ADDRESS.json')
    const getUser = async (userID) => {
        let response = await fetch('http://' + ip.ipAddress + ':3000/user/id/' + userID)
        response = await response.json()
        return response
    }

    var top5 = []
    var sorted_users = users.sort((a,b)=>b.amountDonated - a.amountDonated).slice(0,5)

    // for (let i = 0; i<)
}

// export function is_expired(unix_timestamp){
//     let expired = false
//     var date = (new Date(unix_timestamp * 1000)).getTime(); // convert to date in ms
//     if (Date.now() > date){
//         expired = true
//     }
//     return expired
// }