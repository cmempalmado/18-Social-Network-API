const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userSeeds, thoughtSeeds } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    const users = userSeeds;
    const thoughts = thoughtSeeds;

    await User.collection.insertMany(users);    

    await Thought.collection.insertMany(thoughts);

    console.log('~~~~~~ Seeding complete! ~~~~~');
    process.exit(0);
});