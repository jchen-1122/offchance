// if you're making 100 cards then just repeat each user 20 times (each user should have an id window of 20)
// user # 100 is the grand prize winner
export function get_user(id) {
    let data;

    // id of 0-19
    if (id < 20) {
        data = {
            name: 'Aang',
            username: 'theavatar',
            profilePic: "https://i.pinimg.com/originals/dc/24/88/dc2488feb2d6dc4750a95a1f715c67d8.jpg",
            following: false,
            prize: '1 Chance'
        }
    }

    // id of 20-39
    else if (id < 40){
        data = {
            name: 'Katara',
            username: 'myMOTHER',
            profilePic: "https://vignette.wikia.nocookie.net/avatar/images/7/7a/Katara_smiles_at_coronation.png/revision/latest?cb=20150104171449",
            following: false,
            prize: '5 Chances'
        }
    }

    // id of 40-59
    else if (id < 60) {
        data = {
            name: 'Toph',
            username: 'sonicscream',
            profilePic: "https://vignette.wikia.nocookie.net/avatar/images/4/46/Toph_Beifong.png/revision/latest?cb=20131230122047",
            following: false,
            prize: '10 Chances'
        }
    }


    // id of 60-79
    else if (id < 80) {
        data = {
            name: 'Sokka',
            username: 'meatnsarcasm',
            profilePic: "https://vignette.wikia.nocookie.net/avatar/images/c/cc/Sokka.png/revision/latest?cb=20140905085428",
            following: false,
            prize: '15 Chances'
        }
    }

    // id of 80-99
    else if (id < 100) {
        data = {
            name: 'Zuko',
            username: 'honor',
            profilePic: "https://vignette.wikia.nocookie.net/avatar/images/4/4b/Zuko.png/revision/latest?cb=20180630112142",
            following: false,
            prize: '20 Chances'
        }
    }

    // grand prize winner
    else if (id == 100) {
        data = {
            name: 'Momo',
            username: 'momodynasty',
            profilePic: "https://vignette.wikia.nocookie.net/avatar/images/4/43/Inquisitive_Momo.png/revision/latest/top-crop/width/360/height/360?cb=20081225191217",
            following: false,
            prize: 'Grand Prize'
        }
    }

    else {
        data = "Pls enter in a number from 0-99";
    }

return data;
}