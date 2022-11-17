const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usernames, emails, thoughtsExamples } = require('./data');



connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to SocNetAPI');
    const usersArray = [];
    const thoughtsArray = [];
    await User.deleteMany({});
    await Thought.deleteMany({});

// Loop 7 times -- add users to the usersArray
    for (let i = 0; i < 7; i++) {
        const users = usernames[i];
        const email = emails[i];
        const thoughts = thoughtsExamples[i];

        usersArray.push({users, email, thoughts});
        thoughtsArray.push({users, thoughts});

    };

    await User.collection.insertMany(usersArray);

    // await User.collection.insertOne(emails);

    await Thought.collection.insertMany(thoughtsArray);

    console.table(usersArray);
    console.table(thoughtsArray);

    console.log('~~~~~~ Seeding Complete! ~~~~~');
    process.exit(0);
});