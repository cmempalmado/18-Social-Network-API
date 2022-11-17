const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usernames, emails, thoughtsExamples } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thought.deleteMany({});

    const usersArray = [];
    const thoughtsArray = [];

    for (var i=0; i<7; i++) {
        const users = usernames[i];
        const email = emails[i];
        const thoughts = thoughtsExamples[i];

        usersArray.push({users, email, thoughts});
        thoughtsArray.push({users, thoughts});

    }




    await User.collection.insertMany(usersArray);

    // await User.collection.insertOne(emails);

    await Thought.collection.insertMany(thoughtsArray);

    console.log('~~~~~~ Seeding Complete! ~~~~~');
    process.exit(0);
});