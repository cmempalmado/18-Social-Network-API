const { User, Thought } = require('../models');

const userController = {
// Get all users
  getAllUsers(req, res) {
    User.find()
      .select('-__v')
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// Get a user by id
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => {res.json(userData)})
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {$set: req.body,},
      {
        runValidators: true,
        new: true,
      }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// Delete user and delete same user thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        return Thought.deleteMany({ _id: { $in: userData.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

// Add a friend to friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, 
      { $addToSet: { friends: req.params.friendId } }, 
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// Remove a friend from friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, 
      { $pull: { friends: req.params.friendId } }, 
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;