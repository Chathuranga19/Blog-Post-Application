import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import './BlogPosts.css';
import { useNavigate } from 'react-router-dom';

const ViewBlogPosts = () => {

    //use to redirect to another page
    let navigate = useNavigate();

    const [posts, setposts] = useState([])

    //fetch data from the database
    var fetchData = useCallback(() => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/api/blogPost/all`
        }).then((res) => {
            setposts(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    //use useEffect to specify actions to do after render
    useEffect(() => {
        fetchData()
    }, [fetchData])
    // to prevent infinite loops

    console.log(posts)

    //function to delete a blogpost
    const onDeletePosts = (id) => {
        if (window.confirm('Are you sure, you want to delete the selected post?')) {
            axios({
                method: 'DELETE',
                url: `http://localhost:5000/api/blogPost/${id}`
            }).then((res) => {
                console.log(res.data)
                fetchData()
            }).catch((error) => {
                fetchData()
            })

        }
    }

    return (
        <div>

            <center>

            <h1>ALL BLOGS</h1>
            <div className='btndiv'>
                <button type="button" onClick={() => { navigate("/createPost") }} className='addbtn'>Add New Blog</button>
            </div>
            <hr />


                {
                    posts && posts.map((posts) => (

                        <div >
                            <div class="row" style={{ width:'800px', marginLeft:'250px'}}>

                                <div class="column">
                                    <h3> <u> {posts.Title} </u> </h3>
                                    {posts.Content} <br></br>

                                    <input type="text" class="box" value={posts.Created_Date} disabled></input>

                                </div>


                                <div class="column" style={{ marginTop:'40px'}}>

                                    <button type="button" onClick={() => { navigate (`/updatePost/${posts._id}`) }} className='updatebtn'>Update Blog</button><br />
                                    <button type="button" onClick={() => onDeletePosts(posts._id)} className='deletebtn'>Delete Blog</button>

                                </div>


                            </div>
                            <hr />
                        </div>

                    ))


                }

            </center >

        </div >
    )
}


export default ViewBlogPosts;