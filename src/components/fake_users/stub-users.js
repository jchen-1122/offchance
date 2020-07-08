// if you're making 100 cards then just repeat each user 20 times (each user should have an id window of 20)
// user # 100 is the grand prize winner
export function get_user(id) {
    let data;

    // id of 0-19
    if (id < 20) {
        data = {
            name: 'Aang',
            username: 'theavatar',
            profilePic: require('../../../assets/images/donor_placeholders/aang.png'),
            following: false,
            prize: '1 Chance'
        }
    }

    // id of 20-39
    else if (id < 40){
        data = {
            name: 'Katara',
            username: 'myMOTHER',
            profilePic: require('../../../assets/images/donor_placeholders/katara.png'),
            following: false,
            prize: '5 Chances'
        }
    }

    // id of 40-59
    else if (id < 60) {
        data = {
            name: 'Toph',
            username: 'sonicscream',
            profilePic: require('../../../assets/images/donor_placeholders/toph.png'),
            following: false,
            prize: '10 Chances'
        }
    }


    // id of 60-79
    else if (id < 80) {
        data = {
            name: 'Sokka',
            username: 'meatnsarcasm',
            profilePic: require('../../../assets/images/donor_placeholders/sokka.png'),
            following: false,
            prize: '15 Chances'
        }
    }

    // id of 80-99
    else if (id < 100) {
        data = {
            name: 'Zuko',
            username: 'honor',
            profilePic: require('../../../assets/images/donor_placeholders/zuko.png'),
            following: false,
            prize: '20 Chances'
        }
    }

    // grand prize winner
    else if (id == 100) {
        data = {
            name: 'Momo',
            username: 'momodynasty',
            profilePic: require('../../../assets/images/donor_placeholders/momo.png'),
            following: false,
            prize: 'Grand Prize'
        }
    }

    else {
        data = "Pls enter in a number from 0-99";
    }

return data;
}