import React, {useState, useEffect} from 'react';
import { ScrollView, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';
import styles from './RaffleResult.styling';
import TextLink from '../../../01_Atoms/Buttons/TextLinks/TextLinks';
import WinnerCard from '../../../03_Organisms/WinnerCard/WinnerCard';


export default function RaffleResult({navigation, route}) {
    const [selected, setSelected] = useState(null)
    const [overlay, setoverlay] = useState(false)
    const [prize, setPrize] = useState(null)
    const [enteredUsers, setEnteredUsers] = useState([])
    const [winners, setWinners] = useState({})
    const ip = require('../../../IP_ADDRESS.json');

    var dummy_user = {
        "paymentInfo": [],
        "walletChances": 0,
        "likedRaffles": [],
        "enteredRaffles": [
            "5f171e05fe0108ee8b5e5c13"
        ],
        "following": [
            "5f171974fe0108ee8b5e5c11",
            "5f1719b9fe0108ee8b5e5c12",
            "5f1718bdfe0108ee8b5e5c0e"
        ],
        "followers": [
            "5f1757f7c9deeef8c14b6a40",
            "5f18f87115d7102cddd56c49",
            "5f1a7331c8ebd23bcf5e70b9",
            "5f1a6bdb457f816624a7a48c"
        ],
        "isHost": false,
        "rafflesPosted": [],
        "informed": false,
        "isAdmin": false,
        "_id": "5f1717acfe0108ee8b5e5c0b",
        "name": "Chelly Compendio",
        "username": "chellxchell",
        "phoneNumber": "6102020312",
        "email": "chelly.comp@gmail.com",
        "password": "$2a$08$9AhlfP9vRNtzJJpBk8HrKusQDCqsd4q0knJKTnjnP52qwtnT8S8vK",
        "tokens": [],
        "__v": 47,
        "profilePicture": "https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/dummy-users/chelly.jpg"
    }

    var dummy_raffle = {
        "users": {
            "children": [
                {
                    "_id": "5f176470ae674a1e83bb40fa",
                    "userID": "5f1717acfe0108ee8b5e5c0b",
                    "amountDonated": 10,
                    "chances": 40,
                    "sizeType": "M",
                    "size": "4"
                },
                {
                    "_id": "5f176470ae674a1e83bb40fc",
                    "userID": "5f1718bdfe0108ee8b5e5c0e",
                    "amountDonated": 20,
                    "chances": 50,
                    "sizeType": "M",
                    "size": "5"
                },
                {
                    "_id": "5f176470ae674a1e83bb40fd",
                    "userID": "5f17190afe0108ee8b5e5c0f",
                    "amountDonated": 50,
                    "chances": 150,
                    "sizeType": "M",
                    "size": "10"
                },
                {
                    "_id": "5f176470ae674a1e83bb40fe",
                    "userID": "5f1757f7c9deeef8c14b6a40",
                    "amountDonated": 100,
                    "chances": 400,
                    "sizeType": "M",
                    "size": "9.5"
                },
                {
                    "_id": "5f176470ae674a1e83bb40ff",
                    "userID": "5f1719b9fe0108ee8b5e5c12",
                    "amountDonated": 200,
                    "chances": 800,
                    "sizeType": "M",
                    "size": "6"
                }
            ]
        },
        "amountLiked": 0,
        "images": [
            "https://stockx.imgix.net/Air-Jordan-1-Mid-Shattered-Backboard-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&trim=color&updated_at=1567801617&w=1000"
        ],
        "charities": [
            "ACLU",
            "NAACP"
        ],
        "sizeTypes": [
            "M"
        ],
        "sizes": [
            "8",
            "8.5",
            "9",
            "9.5",
            "10",
            "10.5",
            "11",
            "11.5",
            "12",
            "13"
        ],
        "approved": false,
        "archived": false,
        "_id": "5f1763d3ae674a1e83bb40f9",
        "name": "Air Jordan 1 Mid 'Shattered Backboard'",
        "description": "Enter for your chance to win a pair of these Air Jordan 1 Mid's inspired by the highly sought after 'Shattered Backboard' colorway which released in high top form back in 2015.",
        "type": 1,
        "startTime": 1597921200,
        "__v": 1,
        "donationGoal": 250,
        "hostedBy": "5f175f89b044c33b28ebe4e5"
    }

    React.useEffect(() => {
        async function getRaffle(id) {
            let response = await fetch('http://' + ip.ipAddress + ':3000/raffle/id/' + id)
            response = await response.json()
            setEnteredUsers(response.users.children)
        }
        getRaffle(route.params.raffle._id)
    }, [])
    
    // will change based on the number of rewards
    // rewards[0] = grand prize (1)
    // rewards[1] = 50 chances (2)
    // rewards[2] = 20 chanes (3)
    // rewards[3] = 10 chances (4)
    let rewards = [1,2,3,4]
    let numRewards = 10
    let currPrize = 0

    // const winners = route.params.raffle.users.children.sort((a,b)=>b.amountDonated - a.amountDonated).slice(0,numWinners)

    // randomly and proportionally assign rewards to users
    React.useEffect(() => {

        let temp = {}

        while (numRewards !== 0) {
            // 1. assign everyone a range of numbers based on the number of chances
            let ranges = {}
            let count = 1
            let numChances = 0
            for (var i = 0; i < enteredUsers.length; i++) {
                ranges[enteredUsers[i].userID] = [count, count + enteredUsers[i].chances - 1]
                count += enteredUsers[i].chances
                numChances += enteredUsers[i].chances
            }

            // 2. Generate a random number from 0 to numChances
            const rand = Math.floor((Math.random() * numChances) + 1)

            // 3. determine who's range qualifies (both ends inclusive)
            let winner = -1
            for (var i = 0; i < enteredUsers.length; i++) {
                if (ranges[enteredUsers[i].userID][0] <= rand && ranges[enteredUsers[i].userID][1] >= rand) {
                    winner = enteredUsers[i].userID
                    temp[enteredUsers[i].userID] = currPrize
                    break
                }
            }

            // 4. update variables for next loop
            numRewards--;
            rewards[currPrize] -= 1
            if (rewards[currPrize] == 0) {
                currPrize += 1
            }

            // 5. delete current winner from array
            for(var i = enteredUsers.length - 1; i >= 0; i--) {
                if(enteredUsers[i].userID === winner) {
                    // console.log('deleted')
                    enteredUsers.splice(i, 1);
                    break
                }
            }
        }
        setWinners(temp)

        // @Matt the winners object is {key: userId, value: reward}, reward rn is just a number (see top of file)
        console.log(winners)
    }, [enteredUsers])

    //const customData = require('../../../fake_users/stub-users.json');
    //let plswork = customData.users[2].name

    let CardArray = []
    let count = 0

    for (var key in winners) {
        //console.log('1')
        // check if the property/key is defined in the object itself, not in parent
        if (winners.hasOwnProperty(key)) {    
            var color
            count++
            switch (winners[key]) {
                case 0:
                    color = styles.gold;
                    break;
                case 1:
                    color = styles.silver;
                    break;
                case 2:
                    color = styles.orange;
                    break;
                default:
                    color = styles.purple;
                    break;
            }
            CardArray.push(
                <TouchableOpacity style={[styles.card, color]} 
                    onPress={() => {
                        setoverlay(true)
                        setSelected(count)
                        setPrize(winners[key])
                    }}>
                        <View style={styles.circle_outline} >
                            <Image 
                                style={styles.circle_pic}
                                source={{ uri: 'https://oc-mobile-images.s3.us-east.cloud-object-storage.appdomain.cloud/oc-logo.png' }}
                            />
                        </View>
        
                        {/* This is what will be displayed on the back of the cards */}
                </TouchableOpacity>
            )
        }
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                {CardArray}
                <Overlay isVisible={overlay} onBackdropPress={() => setoverlay(false)} overlayStyle={{backgroundColor: 'transparent'}}>
                    <WinnerCard color="gold" winner={dummy_user} raffle={dummy_raffle} host={dummy_user} selected={selected} navigation={navigation}/>
                </Overlay>
            </View>
        </ScrollView>
    )
}