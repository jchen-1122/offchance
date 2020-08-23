  
var colors = {
    limeGreen: '#31ED31',
    lightGreen: '#B2FF9F',
    darkGreen: '#0E4A26',
    blue: '#0C2B9B',
    lightGray: '#EFEFEF',
    gray: '#878787',
    darkGray: '#545454',
    green: '#1D9000',
    red: '#FF0000',

    // company specific
    facebookBlue: '#3B5998',
    paypalYellow: '#F8BF38',

    // colors for the WinnerCard
    gold1: '#D0912E',
    gold2: '#F9F4AF',
    silver1: '#595959',
    silver2: '#F1F1F1',
    bronze1: '#8A501A',
    bronze2: '#FFD6C9',

    // arrays for gradients
    get goldGradient(){
        return [this.gold1, this.gold2]
    },
    get goldGradientBg(){
        return [this.gold1, this.gold2, this.gold1]
    },
    get silverGradient(){
        return ["#9E9E9E", "#EDEDED"]
    },
    get silverGradientBg(){
        return ["#9E9E9E", "#EDEDED", "#9E9E9E"]
    },
    get bronzeGradient(){
        return [this.bronze1, this.bronze2]
    },
    get bronzeGradientBg(){
        return [this.bronze1, this.bronze2, this.bronze1]
    },
    get whiteGradientBg(){
        return ['#D9D8D8', 'white', '#D9D8D8']
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