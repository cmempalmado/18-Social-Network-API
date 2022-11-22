const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
  createReaction,
  removeThought,
  removeReaction,
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
