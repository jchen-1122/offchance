const ip = require('../components/IP_ADDRESS.json')

// gets array of user raffle objects, returns array of top 5 donors (user objects)
export function top5_raffle(users){
    const ip = require('../components/IP_ADDRESS.json')

    // gets actual user object based on their ID
    const getUser = async (userID) => {
        let response = await fetch('http://' + ip.ipAddress + '/user/id/' + userID)
        response = await response.json()
        return response
    }

    // gets prof pics of top 5 users and returns it
    const getTop5 = async(users) => {
        var top5 = []
        var sorted_users = users.sort((a,b)=>b.amountDonated - a.amountDonated).slice(0,5) // sort by amount donated

        for (let i = 0; i<sorted_users.length; i++){
            let user = await getUser(sorted_users[i].userID)
            top5.push(user.profilePicture)
        }
        return top5
    }

    // driver code
    if (users){
        return getTop5(users)
    }
}

// GLOBAL TOP 5 DONORS =================================================================================================================

// check if a raffle is starting this week 
function isRecentRaffle(raffle) {
    var thisWeek = moment(raffle.lastDonatedTo * 1000).isSame(new Date(), 'week');
    var upcoming = moment(raffle.lastDonatedTo * 1000).isAfter(new Date()) // make sure it hasn't already happened
    return thisWeek && upcoming
}

// get all the raffles happening this week
async function getRecentRaffles() {
    let response = await fetch('http://' + ip.ipAddress + '/raffle/all')
    response = await response.json()
    response = response.filter((raffle) => { return isRecentRaffle(raffle) }) // filter recent ones
    return response
}

export async function top5_global(users) {
    let recentRaffles = await getRecentRaffles() // all raffles this week
    console.log(recentRaffles.length)
}