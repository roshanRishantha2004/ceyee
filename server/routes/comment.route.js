const express = require('express');
const commentRouter = express.Router();
const commentController = require('../controllers/comment.controller');

commentRouter.post('/', commentController.createComment);

commentRouter.get('/', commentController.getAllCommentsBySong);


module.exports = commentRouter;