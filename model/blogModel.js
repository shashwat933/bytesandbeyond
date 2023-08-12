const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        type: String,
        required: [true, 'Image is requried']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, 'user id is required']
    }
}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema);  