  
var colors = {
    limeGreen: '#31ED31',
    lightGreen: '#B2FF9F',
    lightGray: '#EFEFEF',
    gray: '#878787',
    darkGray: '#545454',
    instaPurple: '#983E9B', // for login/sign in to instagram
    facebookBlue: '#3B5998', // for login/sign in to fb
    green: '#1D9000',
    red: '#FF0000',
    darkGreen: '#0E4A26',

    get primaryColor(){
        return this.limeGreen
    },
    get secondaryColor(){
        return this.darkGreen
    },
    tertiaryColor: 'black'
};

export {colors};