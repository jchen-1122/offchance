export function unix_to_date(unix_timestamp){
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

    var date = new Date(unix_timestamp * 1000); // convert to date object
    var ampm = (date.getHours() >= 12) ? "PM" : "AM"; // am or pm
    var hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()

    var str = monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + hour + ':'+date.getMinutes()+ampm
    return str
}