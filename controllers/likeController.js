const Post = require("../models/postModel");
const Like = require("../models/likeModel");

const Todo = require("../model/TODO");

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const response = await Todo.create({ title, description });

    res.status(200).json({
      success: true,
      data: response,
      message: "entry created successfully",
    });
  } catch (error) {
    console.log(error);
    console.error(err);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: err.message,
    });
  }
};

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const response = await Todo.find({});

    res.status(200).json({
      success: true,
      data: response,
      message: "Todos fetched successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};

// Get single todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Todo.findById(id);

    if (!response) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: response,
      message: "Todo fetched successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};

// Update todo by ID
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const response = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!response) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: response,
      message: "Todo updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};

// Delete todo by ID
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Todo.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: response,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};
exports.likePost = async (req, res) => {
  try {
    //fetch data from req body
    const { post, user } = req.body;
    //create a comment object
    const like = new Like({
      post,
      user,
    });

    //save the new comment into the database
    const savedLike = await like.save();

    //find the post by id, add the new comment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true },
    )
      .populate("likes")
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "error while like",
    });
  }
};

//unlikepost
exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    //find and delete the like collection me se
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

    //update the post collection
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } },
      { new: true },
    );

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "error while unlike",
    });
  }
};

exports.dummyLink = (req, res) => {
  res.send("this is dummy page");
};
