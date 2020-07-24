const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function unix_to_date(unix_timestamp) {

    var date = new Date(unix_timestamp * 1000); // convert to date object
    var ampm = (date.getHours() >= 12) ? "PM" : "AM"; // am or pm
    var hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours() // hour in AM or PM instead of military
    var diff = date.getTime() - Date.now() // calc time until date
    var str;

    // check if its 24 hours away
    if (diff > (24 * 3.6 * Math.pow(10, 6))) {
        var timer = new Date(diff)
        str = timer.getHours() + 'h ' + timer.getMinutes() + 'm ' + timer.getSeconds() + 's'
    }
    // display as date if its more than 24 hours away
    else {
        str = format_date(date)
    }
    return str
}

export function in_a_day(unix_timestamp) {

    var date = new Date(unix_timestamp * 1000); // convert to date object
    var diff = date.getTime() - Date.now() // calc time until date

    // check if its 24 hours away
    if (diff < (24 * 3.6 * Math.pow(10, 6))) {
        return true;
    }
    return false;
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