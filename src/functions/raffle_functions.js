
var moment = require('moment');

// as of 8/21, live drawing experience lasts 30 minutes
// change this if we change the duration
const LDE_duration = 30

// checks if a drawing is happening now
export function live_drawing_now(raffle){
    var now = moment()
    var startTime = moment(raffle.startTime * 1000)
    var endTime = moment(startTime).add(LDE_duration, 'minutes') 
    return (now.isAfter(startTime) && now.isBefore(endTime))
}