const express = require('express');
const blogController = require('../controllers/blogController')

const router = express.Router();
// blog routes

router.get('/new', blogController.blog_create_get);

router.get('/', blogController.blog_index)

router.post('/', blogController.blog_create_post)

router.get('/:id', blogController.blog_details)

router.delete('/:id', blogController.blog_delete)

module.exports = router