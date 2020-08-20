var moment = require('moment');
const ip = require('../components/IP_ADDRESS.json')

// RAFFLE TOP 5 DONORS =================================================================================================================

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

// get all the raffles with donations this week
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
    res = sortUsers(top5_IDs, res)
    return res
}

// returns top 5 donors (user objects) this week
export async function top5_global() {
    let recentRaffles = await getRecentRaffles() // all raffles this week
    let userAmtMap = new Map() // maps id of user -> amt donated for that week

    // cycle through each raffle
    for (var raffle of recentRaffles) {
        var enteredUsers = raffle.users.children
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

// LATEST WINNERS =================================================================================================================

// returns most recent 4 drawings
export async function getLatestRaffles() {
    var now_unix = new Date().getTime() / 1000 // now in unix time stamp
    let response = await fetch('http://' + ip.ipAddress + '/raffle/query?dir=desc')
    response = await response.json()
    response = response.filter((raffle) => { return raffle.startTime < now_unix }) // filter recent ones
    response = response.sort((a, b) => (a.startTime < b.startTime) ? 1 : -1) // sort by start time (recent first)
    response = response.slice(0, 4) // get most recent 4 drawings
    return response
}

// returns array of 4 latest winner user objects
async function getWinnerObjs(latestWinnersIDs) {
    // JSON-ify the id array
    let data = {
        ids: latestWinnersIDs
    }
    data = JSON.stringify(data)
    console.log(latestWinnersIDs)
    // make API call with multiple IDs
    const winnerRes = await fetch('http://' + ip.ipAddress + '/user/ids/', {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    })
    let res = await winnerRes.json() // top 5 sorting is lost
    console.log(res.length)
    res = sortUsers(latestWinnersIDs, res)
    return res
}

export async function getLatestWinners() {
    var latestRaffles = await getLatestRaffles()
    var latestWinnersIDs = []
    for (var raffle of latestRaffles) {
        var winners = raffle.winners.children
        for (var winner of winners) {
            if (winner.reward == 0) {
                latestWinnersIDs.push(winner.userID)
            }
        }
    }
    var latestWinners = await getWinnerObjs(latestWinnersIDs)
    return latestWinners
}

export async function getPendingRaffles() {
    let response = await fetch('http://' + ip.ipAddress + '/raffle/query?query=approved&val=false')
    response = await response.json()
    return response
}

export async function getPendingUsers() {
    let response = await fetch('http://' + ip.ipAddress + '/user/query?query=isHost&val=false')
    response = await response.json()
    let res = []
    for (var i = 0; i < response.length; i++) {
        
        // console.log(response[i].username)
        // console.log(response[i].host_charity)
        // console.log(response[i].host_details)
        // console.log(response[i].host_item)
    
        if ((!Object.keys(response[i]).includes('host_charity') || response[i].host_charity.length === 0) && (!Object.keys(response[i]).includes('host_details') || response[i].host_details.length === 0) && (!Object.keys(response[i]).includes('host_item') || response[i].host_item.length === 0)) {
            continue
        } else {
            res.push(response[i])
        }
    }
    return res
}

export async function getReportedUsers() {
    let response = await fetch('http://' + ip.ipAddress + '/user/query')
    response = await response.json()
    let reported = []
    for (var i = 0; i < response.length; i++) {
        if (response[i].reports.length > 0) {
            reported.push(response[i])
        }
    }
    return reported
}

// get multiple users doesn't return the users in the same order as the input so you have to re-sort
function sortUsers(ids, users){
    var sorted = []
    for (var id of ids){
        for (var user of users){
            if (user._id == id){
                sorted.push(user)
            }
        }
    }
    return sorted
}

// TRENDING RAFFLES =================================================================================================================

// sort by trending (based on entered users and likes)
export function sortTrending(raffles){
    for (var raffle of raffles){
        var enteredUsers = raffle.users.children.length || 0
        var likes = raffle.amountLiked || 0
        raffle['score'] = 0.7*enteredUsers + 0.3*likes // weight more by enteredUsers than likes
    }
    var sorted = raffles.sort((a, b) => (a.score < b.score) ? 1 : -1)
    return sorted
}