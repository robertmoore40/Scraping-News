const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    postbody: {
        type: String,
        required: true

    }
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;