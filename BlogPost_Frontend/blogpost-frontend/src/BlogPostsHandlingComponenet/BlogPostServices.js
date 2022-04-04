import axios from 'axios';

const POSTS_API_BASE_URL = "http://localhost:5000/api/blogPost";

class BlogPostServices{

    getAllPosts(){

        return axios.get(POSTS_API_BASE_URL + '/all');

    }

    createBlogPost(post){

        return axios.get(POSTS_API_BASE_URL, post);

    }

    updateBlogPost(post,postID){

        return axios.put(POSTS_API_BASE_URL + '/' + postID, post);

    }

    deleteBlogPost(postID){

        return axios.delete(POSTS_API_BASE_URL + '/' + postID);

    }


}

export default new BlogPostServices()