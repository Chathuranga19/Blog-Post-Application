import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import './BlogPosts.css';
import { useNavigate } from 'react-router-dom';

const CreatePosts = () => {

    let navigate = useNavigate();

    //get the current date
    var today = new Date(),
        date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    //save data
    const [Title, settitle] = useState("")
    const [Created_Date] = useState(date)
    const [Author, setauthor] = useState("")
    const [Content, setcontent] = useState("")
    const [author1, setauthor1] = useState("")
    const [author2, setauthor2] = useState("")
    const [author3, setauthor3] = useState("")
    const [author4, setauthor4] = useState("")
    const [author5, setauthor5] = useState("")


    //onchange function to get user inputs
    const handleSelect = (e) => {
        setauthor(e.target.value);
    };

    //fetch data from the database
    const fetchData = useCallback(() => {

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

    //use useEffect to specify actions to do after render
    useEffect(() => {
        fetchData()
    }, [fetchData])

    //excutes when user submit the form
    function submitDetails(e) {
        e.preventDefault();//to prevent the normal behavior of submit
        const newPost = {
            Title,
            Content,
            Author,
            Created_Date
        }

        //create a new blogpost and insert it to the database
        axios.post("http://localhost:5000/api/blogPost/", newPost).then(() => {
            alert("New Blog Created!!");
            navigate("/");


        }).catch((error) => {
            alert(error);
        })

    }


    return (
        <div>
            <center>
                <h1 >Add a Blog Post</h1>
                <div >

                    <form onSubmit={submitDetails}>
                        <div style={{ width: '330px', margin: '0' }} >
                            <div className='form-subgroup'>
                                <label > Title </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input placeholder="Enter the title of the post " name="Title"
                                    onChange={(e) => {
                                        settitle(e.target.value);
                                    }} required />
                            </div>

                            <br /><br /> <br />
                            <div className='form-subgroup'>
                                <label> Content </label>&nbsp;
                                <textarea className='text' placeholder="content of the post" name="content"
                                    onChange={(e) => {
                                        setcontent(e.target.value);
                                    }} required />
                            </div>
                            <br /><br /> <br /><br />
                            <div className='form-subgroup'>
                                <label > Author </label>&nbsp;&nbsp;&nbsp;
                                <select name="author" value={Author} onChange={handleSelect} required>
                                    <option value="" disabled={true} style={{ textAlign: "center" }}>-----Select an author-----</option>
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


export default CreatePosts;