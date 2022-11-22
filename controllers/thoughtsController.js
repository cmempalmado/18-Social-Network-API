const { Thought, User } = require('../models');

const thoughtController = {
// Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },

// Create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.json(err));
    },

// Get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: 'Thought not found' })
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },

// Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body }, 
            { runValidators: true, new: true }
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: 'Thought not found' })
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },

// Add reaction to a thought
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true },
        )
            .then((reactionData) =>
                !reactionData
                    ? res
                        .status(404)
                        .json({ message: 'Thought not found' })
                    : res.json(reactionData)
            )
            .catch((err) => res.status(500).json(err));
    },

// Remove a thought
    removeThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thoughtData) => 
            !thoughtData
                ? res.status(404).json({ message: `No thought with that id!`})
                : res.json({message: `Thought removed!`})
        )
},

// Remove a reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          )
            .then((reactionData) => 
              !reactionData
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(reactionData)
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },
};

module.exports = thoughtController;
