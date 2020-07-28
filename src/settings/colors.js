  
var colors = {
    limeGreen: '#31ED31',
    lightGreen: '#B2FF9F',
    lightGray: '#EFEFEF',
    gray: '#878787',
    darkGray: '#545454',
    facebookBlue: '#3B5998', // for login/sign in to fb
    green: '#1D9000',
    red: '#FF0000',
    darkGreen: '#0E4A26',

    // colors for the WinnerCard
    gold1: '#D0912E',
    gold2: '#F9F4AF',
    silver1: '#595959',
    silver2: '#F1F1F1',

    get goldGradient(){
        return [this.gold1, this,gold2, this.gold1]
    },
    get silverGradient(){
        return ['#9E9E9E', '#EDEDED', '#9E9E9E']
    },
    
    get primaryColor(){
        return this.limeGreen
    },
    get secondaryColor(){
        return this.darkGreen
    },
    tertiaryColor: 'black'
};

export {colors};