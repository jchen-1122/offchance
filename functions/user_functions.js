// returns true if someone is logged in, false if not
export function user_logged_in(user){
    if (Object.keys(user).length === 0 && user.constructor === Object) {
        return false
    }
    return true
}