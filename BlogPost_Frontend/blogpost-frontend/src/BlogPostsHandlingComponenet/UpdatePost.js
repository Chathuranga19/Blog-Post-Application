import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import './BlogPosts.css';
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {

    //use to redirect to another page
    let navigate = useNavigate();
    //get the blog post id
    let { id } = useParams();

    //save data
    const [Title, settitle] = useState("")
    const [Content, setcontent] = useState("")
    const [author1, setauthor1] = useState("")
    const [author2, setauthor2] = useState("")
    const [author3, setauthor3] = useState("")
    const [author4, setauthor4] = useState("")
    const [author5, setauthor5] = useState("")


    const [Author, setOptionValue] = useState("");

    //onchange function to get user inputs
    const handleSelect = (e) => {
        setOptionValue(e.target.value);
    };

    //fetch blogs and author details from the database
    const fetchData = useCallback(() => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/api/blogPost/${id}`
        }).then((res) => {
            let posts = res.data;
            settitle(posts.Title)
            setcontent(posts.Content)
            setOptionValue(posts.Author)
        }).catch((error) => {
            console.log(error)
        })

        axios({
            method: 'GET',
            url: `http://localhost:5000/api/blogPost/authors/all`
        }).then((res) => {
            let authors = res.data;
            setauthor1(authors[0].Name)
            setauthor2(authors[1].Name)
            setauthor3(authors[2].Name)
            setauthor4(authors[3].Name)
            setauthor5(authors[4].Name)

        }).catch((error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    function updateDetails(e) {
        e.preventDefault();//to prevent the normal behavior of submit
        const updatedPost = {
            Title,
            Content,
            Author,
        }

        //perform the update
        axios.put(`http://localhost:5000/api/blogPost/${id}`, updatedPost).then(() => {
            alert("Selected Blog is Updated!!");
            navigate("/");


        }).catch((error) => {
            alert(error);
        })

    }

    return (
        <div>
            <center>
                <h1 >Update the Blog Post</h1>

                <div >

                    <form onSubmit={updateDetails}>

                        <div style={{ width: '330px', margin: '0' }} >

                            <div className='form-subgroup'>
                                <label > Title </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input placeholder="Enter the title of the post " name="Title" value={Title}
                                    onChange={(e) => {
                                        settitle(e.target.value);
                                    }} required />
                            </div>

                            <br /><br /> <br />
                            <div className='form-subgroup'>
                                <label> Content </label>&nbsp;
                                <textarea className='text' placeholder="content of the post" name="content" value={Content}
                                    onChange={(e) => {
                                        setcontent(e.target.value);
                                    }} required />
                            </div>
                            <br /><br /> <br /><br />

                            <div className='form-subgroup'>
                                <label > Author </label>&nbsp;&nbsp;&nbsp;
                                <select name="author" value={Author} onChange={handleSelect} required>
                                    <option value={author1}>{author1}</option>
                                    <option value={author2}>{author2}</option>
                                    <option value={author3}>{author3}</option>
                                    <option value={author4}>{author4}</option>
                                    <option value={author5}>{author5}</option>
                                </select><br /><br />
                            </div>

                        </div>



                        <button type="submit" className='submitbtn'>Submit</button>
                    </form>

                </div>

            </center>

        </div >
    )
}


export default UpdatePost;