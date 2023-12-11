const Blog = require('../model/blogModel');
const User = require('../model/userModel');


exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('user');
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: 'No blogs found'
            })
        }

        return res.status(200).send({
            success: true,
            count: blogs.length,
            message: 'Blogs list',
            blogs
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in getting blogs",
            error
        })
    }

}

exports.createBlog = async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const image = req.body.image;
        const user = req.body.user;
        console.log(req.body);
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the details"
            })

        }
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "Unable to find user"
            })
        }

        const blog = new Blog({ title, description, image, user });


        await blog.save();
        existingUser.blogs.push(blog);
        await existingUser.save();

        return res.status(201).send({
            success: true,
            message: "Blog created!",
            blog
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in creating blog",
            error
        })
    }

}

exports.updateBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const image = req.body.image;
        const user = req.body.user;

        const blog = await Blog.findByIdAndUpdate(id, { title, description, image }, { new: true });

        return res.status(200).send({
            success: true,
            message: "Blog updated",
            blog
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in updating blog",
            error
        })
    }

}

exports.getBlogById = async (req, res) => {
    try {
        const id = req.params.id;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'blog not found with this id'
            })
        }

        return res.status(200).send({
            success: true,
            message: "Blog fetched",
            blog
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in getting a blog",
            error
        })
    }

}

exports.deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;

        const blog = await Blog.findByIdAndRemove(id).populate('user')
        await blog?.user?.blogs.pull(blog);
        await blog?.user?.save();
        return res.status(200).send({
            success: true,
            message: "Blog deleted",

        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in deleting blog",
            error
        })
    }

}

exports.userBlog = async (req, res) => {
    try {
        const id = req.params.id;
       

        const userBlog = await User.findById(id).populate('blogs');

        if (!userBlog) {
            return res.status(200).send({
                success: false,
                message: 'No blogs found'
            })
        }

        return res.status(200).send({
            success: true,
            count: userBlog.length,
            message: 'User Blogs',
            userBlog
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in getting user blogs",
            error
        })
    }

}