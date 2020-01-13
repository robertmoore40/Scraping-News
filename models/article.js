const mongoose = require('mongoose');
const schema = mongoose.schema;

const articleSchema = new schema({
    
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
            type: schema.Types.ObjectId,
            ref: "Comment"
        }
    ]

});

let Article = mongoose.model("Article", articleSchema);
module.exports = Article;


// needs headline, url, summary, and comment
