const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const handleError = (err) => console.error(err);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {return date.toISOString().split("T") [0];}
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

(err) => (err ? handleError(err) : console.log('Created new document'))

thoughtSchema
  .virtual('reactionCount')
  .get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);



module.exports = Thought;
