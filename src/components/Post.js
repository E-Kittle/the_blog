import React, { useState, useEffect, useContext } from 'react';
import Comment from './Comment';
import { getPost, getComments, postComment } from '../services/user.service';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import htmlDecode from '../services/formatting'


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
                // If poserid is empty, it'll default to Guest user
                if (currentUser.username !== '') {
                    setNewComment({ posterid: currentUser.id, body: '' });
                } else {
                    setNewComment({ posterid: '', body: '' });
                }
            })
            .catch(error => {
                if (error.response.status === 400) {
                    console.log(error.response.data.errArr);
                }
                console.log(error)
            });

    }

    //Hook to grab the current post
    useEffect(() => {

        // Triggers axios method to grab the posts
        getPost(props.match.params.id)
            .then(response => {
                setPost(response.data);
                setLoading(false);      //Flag to indicate to the user visually that the data is being fetched
            })
            .catch(error => {
                console.log(error.response.status)
                if (error.response.status === 404) {
                    // Post is not found - Set error to indicate to the user they need to return to the homepage
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
                    // Post is not found
                    if (error.response.status === 404) {
                        setErr('not found')
                        setLoading(false);
                    } else {
                        console.log(error)
                    }
                })
        }
    }, [newComment, props.match.params.id]);


    // JSX to display the post, its associated data, and all related comments
    return (
        <div className='post-page-wrapper'>
            {/* Display loading message for users */}
            {loading ? <h1>Loading...</h1> : null}

            {/* If db call fails due to inapropriate post_id, display an error */}
            {err !== '' ? <h1> Post not found, return to HomePage </h1> : (
                <div>
                    {/* First, checks that all data has finished loading, then displays post data for user */}
                    {post.author === undefined ? null : (
                        <div className='post-section' >
                            <h1>{htmlDecode(post.title)}</h1>
                            <h3>Author: <Link to={`/profile/${post.author._id}`}>{htmlDecode(post.author.username)}</Link></h3>
                            <h3>Category: {post.category.name}</h3>
                            <h3>Publish Date: {post.date.slice(0, 10)}</h3>
                            <div dangerouslySetInnerHTML={{__html:htmlDecode(post.content)}} />
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
                        <button type='submit' className='button-style'>Submit Comment</button>
                    </form>
                </div>
            )}
        </div>
    )
}


export default Post
