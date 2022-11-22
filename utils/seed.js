const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usernamesExamples, emailsExamples, thoughtsExamples } = require('./data');



connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to SocNetAPI');
    
    await User.deleteMany({});
    await Thought.deleteMany({});
    const usersArray = [];
    const thoughtsArray = [];
    
// Loop 7 times -- add users to the usersArray
    for (let i = 0; i < 7; i++) {
        const username = usernamesExamples[i];
        const email = emailsExamples[i];
        const thoughts = thoughtsExamples[i];

        usersArray.push({username, email, thoughts});
        thoughtsArray.push({username, thoughts});

    };
    // console.log(usersArray, thoughtsArray);
    await User.collection.insertMany(usersArray);

    // await User.collection.insertOne(emails);

    await Thought.collection.insertMany(thoughtsArray);

    console.table(usersArray);
    console.table(thoughtsArray);

    console.log('~~~~~~ Seeding Complete! ~~~~~');
    process.exit(0);
});