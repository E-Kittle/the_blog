import React, { useState, useEffect, useContext } from 'react';
import Comment from './Comment';
import { getPost, getComments, postComment } from '../services/user.service';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';


const Post = (props) => {

    // Grab currentUser from UserContext located in App.js
    const userContext = useContext(UserContext);
    const { currentUser } = userContext;

    // Set state variable for the comments and post for the specific post
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({ title: '', date: '', content: '' });

    // Set state variable for a new comment
    const [newComment, setNewComment] = useState({ posterid: '', body: '' })

    // State to hold any errors/loading
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');



    // Function to handle user entering a new comment
    const handleChange = (event) => {
        setNewComment({
            ...newComment,
            [event.target.id]: event.target.value
        })
    }

    // Function to handle user submitting a new comment
    const handleSubmit = (event) => {
        //Prevent page refresh
        event.preventDefault();

        //Send the comment to the database with axios

        postComment(props.match.params.id, newComment.posterid, newComment.body)
            .then(response => {
                // Clear newComment - This clears the input fields
                if (currentUser.username !== '') {
                    setNewComment({ posterid: currentUser.id, body: '' });
                } else {
                    setNewComment({ posterid: '', body: '' });
                }
            })
            .catch(error => {
                if (error.response.status === 400) {

                    //This returns the error data to a 400 request
                    //This will be triggered if the comment body is missing
                    //However, this will never be triggered because
                    //the text input has 'required'
                    console.log(error.response.data.errArr);
                }
            });

    }

    //Hook to grab the current post
    useEffect(() => {

        getPost(props.match.params.id)
            .then(response => {
                // console.log(response.data)
                setPost(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error.response.status)
                if (error.response.status === 404) {
                    setErr('not found')
                    setLoading(false)
                } else {
                    console.log(error)
                }
            })
    }, [props.match.params.id]);


    useEffect(() => {
        // Ensures that we grab the currentUser data before form submit
        setNewComment({
            ...newComment,
            posterid: currentUser.id
        })
    }, [currentUser])


    // Hook to grab the comment data from the API
    useEffect(() => {
        // New API call is triggered if user submits a new comment
        if (newComment.body === '') {
            getComments(props.match.params.id)
                .then(response => {
                    setComments(response.data.comments);
                })
                .catch(error => {
                    console.log('for comment')
                    if (error.response.status === 404) {
                        setErr('not found')
                        setLoading(false);
                    } else {
                        console.log(error)
                    }
                })
        }
    }, [newComment, props.match.params.id]);


    return (
        <div className='post-page-wrapper'>
            {err !== '' ? <h1> Post not found, return to HomePage </h1> : (
                <div>
                    {loading ? <h1>Loading...</h1> : null}
                    {/* First, check if the database had returned an author yet */}
                    {post.author === undefined ? null : (
                        <div className='post-section' >
                            <h1>{post.title}</h1>
                            <h3>Author: <Link to={`/profile/${post.author._id}`}>{post.author.username}</Link></h3>
                            <h3>Category: {post.category.name}</h3>
                            <h3>Publish Date: {post.date.slice(0, 10)}</h3>
                            <p>{post.content}</p>
                        </div>
                    )}


                    {/* Display each of the comments for the post */}
                    <div className='comment-wrapper'>
                        <h3>Comments</h3>
                        {comments.length === 0 ? <h3>No Comments Yet</h3> : null}
                        {comments.map(comment => {
                            return (
                                <Comment comment={comment} key={comment._id} />
                            )
                        })}
                    </div>

                    {/* Form to add a new post */}
                    <form onSubmit={handleSubmit}>
                        <div className='form-element user-label'>
                            {currentUser.username !== '' ? <h4>Add a comment as {currentUser.username}</h4> : <h4>Add a comment as Guest</h4>}
                        </div>
                        <div className='form-element'>
                            <label htmlFor='body'></label>
                            <textarea id='body' name='body' required value={newComment.body} onChange={handleChange} />
                        </div>
                        <button type='submit' class='button-style'>Submit Comment</button>
                    </form>
                </div>
            )}
        </div>
    )
}


export default Post
