const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    
    headline: {
        type: String,
        required: true
    },
    url : {
        type:String,
        required:true
    },
    summary : {
        type: String,
        required:true
    },
    comment : [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]

});

let Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;


// needs headline, url, summary, and comment
