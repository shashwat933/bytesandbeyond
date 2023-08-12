const express = require('express');
const blogController = require('../Controller/blogController')

const router = express.Router();


router.get('/all-blog', blogController.getAllBlogs);

router.post('/create-blog', blogController.createBlog);

router.put('/update-blog/:id', blogController.updateBlog);

router.get('/get-blog/:id', blogController.getBlogById);

router.delete('/delete-blog/:id', blogController.deleteBlog);

router.get('/user-blog/:id',blogController.userBlog);


module.exports=router;