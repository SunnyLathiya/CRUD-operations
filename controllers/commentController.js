//import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//logic
exports.createComment = async (req, res) => {
    try{
        //fetch data from req bodyv
        const {post, user, body} = req.body;
        //create a comment object
        const comment = new Comment({
            post,user,body
        });

        //save the new comment into the database
        const savedComment = await comment.save();

        //find the post by id, add the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id} }, {new: true}  )
                           .populate("comments")
                           .exec();
        
        res.json({
            post: updatedPost,
        });          
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            error: "error while creating comment",
        });
    }
};