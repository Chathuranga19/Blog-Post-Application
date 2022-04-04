const BlogPost = require("../models/BlogPost.model");
const BlogAuthors = require("../models/BlogAuthors.model")

//Insert a blog post
const addPost = (req, res) => {

    const { Title, Content, Author, Created_Date } = req.body;

    const post = new BlogPost({
        Title,
        Content,
        Author,
        Created_Date
    });

    post.save().then((createdPost) => {
        res.json(createdPost);
    }).catch((error) => {
        res.status(400).json(error);
    });
};

//Retrieve all blog posts from the database
const getPosts = async (req, res) => {

    try {
        const posts = await BlogPost.find();
        res.json(posts)
    } catch (error) {
        res.status(400).json(error);
    }
};

//get all authors from the database
const getAuthors = async (req, res) => {

    try {
        const authors = await BlogAuthors.find();
        res.json(authors)
    } catch (error) {
        res.status(400).json(error);
    }
};

//get a blogpost by the ID
const getPostById = async (req, res) => {

    //access the id which comes from the URL
    const blogId = req.params.id;
    try {
        //find the post by Id and get it
        const postById = await BlogPost.findById(blogId);
        res.json(postById)

        //404 not found error if there is no posts
        if (!postById) {
            return res.status(404).json("There is no such a blog post");
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

//update a blog post
const updatePost = async (req, res) => {

    //access the id which comes from the URL
    const blogId = req.params.id;
    try {
        //find the post
        const post = await BlogPost.findById(blogId);

        //404 not found error if there is no posts
        if (!post) {
            return res.status(404).json("There is no such blog post to update");
        }

        const { Title, Content, Author } = req.body;

        const bpost = await BlogPost.findByIdAndUpdate(blogId, { Title, Content, Author });

        //if the update is successed
        res.status(200).json(bpost);

    } catch (error) {
        res.status(400).json(error.message);
    }

};

//delete a blog post
const deletePost = async (req, res) => {

    //access the id which comes from the URL
    const blogId = req.params.id;

    try {
        const post = await BlogPost.findById(blogId);

        //404 not found error if there is no posts
        if (!post) {
            return res.status(404).json("There is no such blog post to delete");
        }

        const delPost = await BlogPost.findByIdAndDelete(blogId);
        res.status(400).json(delPost);

    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = {
    addPost,
    getPosts,
    updatePost,
    deletePost,
    getPostById,
    getAuthors,
};