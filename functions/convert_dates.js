const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var moment = require('moment');

export function unix_to_date(unix_timestamp) {
    return (in_a_day(unix_timestamp) ? getTimer(unix_timestamp, true) : format_date(date))
}

export function getTimer(unix_timestamp, showSeconds) {
    var now = moment (new Date())
    var startTime = moment(unix_timestamp * 1000)
    var timeLeft = moment(startTime.diff(now))
    var formatted = showSeconds? timeLeft.format('DD[d ]HH[h ]mm[m ]ss[s]') : timeLeft.format('DD[d ]HH[h ]mm[m ]')
    return formatted
}

export function in_a_day(unix_timestamp) {
    var startTime = moment(unix_timestamp*1000)
    return startTime.isSame(new Date(), 'day');
}

export function is_expired(unix_timestamp) {
    let expired = false
    var date = (new Date(unix_timestamp * 1000)).getTime(); // convert to date in ms
    if (Date.now() > date) {
        expired = true
    }
    return expired
}

// returns nice, formatted string from a date object
export function format_date(date) {
    var hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours() // hour in AM or PM instead of military
    var ampm = (date.getHours() >= 12) ? "PM" : "AM"; // am or pm

    // add an extra 0 if the minutes is 0
    var placeholder = ''
    if (date.getMinutes() < 10) placeholder = '0'
    
    return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + hour + ':' + placeholder + date.getMinutes() + ampm
}

// https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/02-fromnow/
export function time_from_now(unix_timestamp, format_nicely) {
    var time = moment(unix_timestamp*1000)
    var prefix = '';
    if (format_nicely){
        prefix = (time.isBefore(new Date())) ? 'Started ' : 'Starts '
    }
    return prefix+time.fromNow()
} 