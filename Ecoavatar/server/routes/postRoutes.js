const express = require('express');
const { getPosts } = require('../controller/postController');
const router = express.Router();

router.get('/posts', getPosts);

module.exports = router;