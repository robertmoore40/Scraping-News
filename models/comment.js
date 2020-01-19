const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    postbody: {
        type: String,
        required: true

    }
})

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;