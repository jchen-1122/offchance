import faker from 'faker'

const data = []
const count = 5

let range = n => Array.from(Array(n).keys()); // generate an array of 1 to n

for(let i in range(count)){
    data.push({
        id: faker.random.uuid(),
        user: {
            name: faker.name.firstName()
        },
        subject: faker.lorem.words(5),
        
        age: 18,
    })
}

export default data;
