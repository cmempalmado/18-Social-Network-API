const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      // E11000 duplicate key error collection occurs when unique is set to true at npm run seed, comment line 8 before running seed then uncomment after seeding is complete
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Enter a valid Email Address!']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount')
  .get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;