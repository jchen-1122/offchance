var moment = require('moment');
var momentDurationFormatSetup = require("moment-duration-format");

// time in the format day:hour:minute (does not include seconds)
export function getTimer(unix_timestamp, showSeconds) {
    var now = moment()
    var startTime = moment(unix_timestamp * 1000)
    var duration = moment.duration(startTime.diff(now))
    return (duration.format("d[d] h[h] m[m]"))
}

// check if a timestamp is occurring in the same day
export function in_a_day(unix_timestamp) {
    var startTime = moment(unix_timestamp*1000)
    return startTime.isSame(new Date(), 'day');
}

// checks if unix timestamp already happened
export function is_expired(unix_timestamp) {
    var startTime = moment(unix_timestamp * 1000)
    return (moment()).isAfter(startTime)
}

// returns nice, formatted string from a date object
export function format_date(date) {
    return moment(date).format("MMMM D, h:mm A")
}

// https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/02-fromnow/
export function time_from_now(unix_timestamp, format_nicely) {
    var time = moment(unix_timestamp*1000)
    var prefix = '';
    if (format_nicely){
        prefix = (time.isBefore(moment())) ? 'Started ' : 'Starts '
    }
    return prefix+time.fromNow()
} 