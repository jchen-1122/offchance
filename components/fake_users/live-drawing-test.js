export function get_user(name) {
    let data;
    if (name == 'Chelly') {
        data = {
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
    }
    return data;
}

export function get_raffle() {
    let data = {
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
    return data;
}