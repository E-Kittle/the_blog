import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import { getPost, getComments, postComment } from '../services/user.service';



const Post = (props) => {

    // Destructure props
    const { currentUser } = props;

    // Set state variable for the comments and post for the specific post
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({ title: '', date: '', content: '' });

    // Set state variable for a new comment
    const [newComment, setNewComment] = useState({ name: currentUser.username, body: '' })

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
        console.log(newComment)

        //Send the comment to the database with axios
        postComment(props.match.params.id, newComment.name, newComment.body)
            .then(response => {
                // Clear newComment - This clears the input fields
                if (currentUser.username !== '') {
                    setNewComment({ name: currentUser.username, body: '' });
                } else {
                    setNewComment({ name: '', body: '' });
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
                setPost(response.data);
            })
            .catch(error => console.log(error))
    }, [props.match.params.id]);


    // Effect to set the currentUser.username to the newComment.name state
    useEffect(() => {
        if(currentUser.username !== ''){
            // Set the state
            setNewComment({
                name: currentUser.username, 
                body: ''
            })
        }
    }, [currentUser])

    // Hook to grab the comment data from the API
    useEffect(() => {
        // New API call is triggered if user submits a new comment
        if ((newComment.name === '' || newComment.name === currentUser.username) && newComment.body === '') {
            getComments(props.match.params.id)
                .then(response => {
                    setComments(response.data.comments);
                })
                .catch(error => console.log(error))
        }
    }, [newComment, props.match.params.id, currentUser]);


    return (
        <div className='post-page-wrapper'>

            <div className='post-section' >
                <h1>{post.title}</h1>
                <p>{post.date.slice(0, 10)}</p>
                <p>{post.content}</p>
            </div>


            {/* Display each of the comments for the post */}
            <div className='comment-wrapper'>
                {comments.map(comment => {
                    return (
                        <Comment comment={comment} key={comment._id} />
                    )
                })}
            </div>

            {/* Form to add a new post */}
            <form onSubmit={handleSubmit}>
                {currentUser.username !== '' ?
                    // user exists
                    <div className='form-element current-user-label'>
                        <h4 >{currentUser.username}</h4>
                    </div>
                    :
                    // User doesn't exist
                    <div className='form-element'>
                        <label htmlFor='name'>Name:</label>
                        <input id='name' name='name' placeholder='name/username (optional)' value={newComment.name} onChange={handleChange} />
                    </div>
                }
                <div className='form-element'>
                    <label htmlFor='body'>Comment:</label>
                    <textarea id='body' name='body' required value={newComment.body} onChange={handleChange} />
                </div>
                <button type='submit'>Submit Comment</button>
            </form>
        </div>
    )
}


export default Post
