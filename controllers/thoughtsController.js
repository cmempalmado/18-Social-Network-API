const { Thought, User } = require('../models');

const thoughtController = {
// get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

// create a new thought
    createThought(req, res) {
        Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username
        })
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })
            .then(response => {
                if (!response) {
                    res.status(404).json({ message: 'Thought with the same ID' });
                    return;
                }
                res.json(response)
            })
            .catch(err => res.json(err));
    },

// get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought not found' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

// update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body }
        )
            .then((thought) =>
                !course
                    ? res.status(404).json({ message: 'Thought not found' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

// add reaction to a thought
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true },
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'Thought not found' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },



// delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought not found' })
                    : res.json({ message: 'Thought has been deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    

// remove a reaction from a thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'User not found' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
}
module.exports = thoughtController;