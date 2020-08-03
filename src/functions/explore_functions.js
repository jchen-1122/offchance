var moment = require('moment');
const ip = require('../components/IP_ADDRESS.json')

// gets array of user raffle objects, returns array of top 5 donors (user objects)
export function top5_raffle(users) {
    const ip = require('../components/IP_ADDRESS.json')

    // gets actual user object based on their ID
    const getUser = async (userID) => {
        let response = await fetch('http://' + ip.ipAddress + '/user/id/' + userID)
        response = await response.json()
        return response
    }

    // gets prof pics of top 5 users and returns it
    const getTop5 = async (users) => {
        var top5 = []
        var sorted_users = users.sort((a, b) => b.amountDonated - a.amountDonated).slice(0, 5) // sort by amount donated

        for (let i = 0; i < sorted_users.length; i++) {
            let user = await getUser(sorted_users[i].userID)
            top5.push(user.profilePicture)
        }
        return top5
    }

    // driver code
    if (users) {
        return getTop5(users)
    }
}


// GLOBAL TOP 5 DONORS =================================================================================================================

// check if a date is this week
function isThisWeek(time) {
    var thisWeek = moment(time * 1000).isSame(new Date(), 'week');
    // var upcoming = moment(raffle.lastDonatedTo * 1000).isAfter(new Date()) // make sure it hasn't already happened
    // return thisWeek && upcoming
    return thisWeek
}

// get all the raffles happening this week
async function getRecentRaffles() {
    let response = await fetch('http://' + ip.ipAddress + '/raffle/all')
    response = await response.json()
    response = response.filter((raffle) => { return isThisWeek(raffle.lastDonatedTo) }) // filter recent ones
    return response
}

// array of 5 ID's -> array of 5 user objects
async function getDonorObjs(top5_IDs) {
    // JSON-ify the id array
    let data = {
        ids: top5_IDs
    }
    data = JSON.stringify(data)

    // make API call with multiple IDs
    const donorRes = await fetch('http://' + ip.ipAddress + '/user/ids/', {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    })
    let res = await donorRes.json()
    console.log(res)
    return res
}

// returns top 5 donors (user objects) this week
export async function top5_global() {
    let recentRaffles = await getRecentRaffles() // all raffles this week
    let userAmtMap = new Map() // maps id of user -> amt donated for that week

    // cycle through each raffle
    for (var raffle of recentRaffles) {
        var enteredUsers = raffle.users.children
        console.log(isThisWeek(raffle.lastDonatedTo))
        // cycle through each entered user in raffle
        for (var user of enteredUsers) {
            // if the user donated this week
            if (isThisWeek(user.timeDonated)) {

                // if user is not in the mapping yet
                if (!userAmtMap.has(user.userID)) {
                    userAmtMap.set(user.userID, user.amountDonated) // map user id -> amount donated for that raffle
                }
                // if user is already in mapping (have already donated to another raffle)
                else {
                    let tempAmt = userAmtMap.get(user.userID)
                    userAmtMap.set(user.userID, tempAmt + user.amountDonated) // update total amount they've donated
                }
            }
        }
    }

    // sort by amount donated
    const userAmtMapSorted = new Map([...userAmtMap.entries()].sort((a, b) => b[1] - a[1]));

    // convert map keys to an array
    let top5_IDs = [...userAmtMapSorted.keys()];
    top5_IDs = top5_IDs.slice(0, 5)

    // return array of 5 user objs
    return getDonorObjs(top5_IDs)
}
