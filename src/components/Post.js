import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import { getPost, getComments, postComment } from '../services/user.service';



const Post = (props) => {

    // Set state variable for the comments and post for the specific post
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({ title: '', date: '', content: '' });

    // Set state variable for a new comment
    const [newComment, setNewComment] = useState({ name: '', body: '' })

    // Function to handle user entering a new comment
    const handleChange = (event) => {
        let commentChange = newComment;
        commentChange[event.target.id] = event.target.value;
        setNewComment(commentChange);

    }

    // Function to handle user submitting a new comment
    const handleSubmit = (event) => {
        //Prevent page refresh
        event.preventDefault();

        //Send the comment to the database with axios
        postComment(props.match.params.id, newComment.name, newComment.body)
            .then(response => {
                console.log(response.data)
                // Data transfer successful, clear the newComment state
                setComments(oldArray => [...oldArray, response.data]);
                setNewComment({ name: '', comment: '' });
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


    // Hook to grab the comment data from the API
    // Need to figure out how to re-trigger an API call when 
    // we submit a new commentf
    useEffect(() => {
        getComments(props.match.params.id)
            .then(response => {
                setComments(response.data.comments);
            })
            .catch(error => console.log(error))
    }, [props.match.params.id]);


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
                <div className='form-element'>
                    <label htmlFor='name'>Name:</label>
                    <input id='name' name='name' placeholder='name/username (optional)' onChange={handleChange} defaultValue={newComment.name} />
                </div>
                <div className='form-element'>
                    <label htmlFor='body'>Comment:</label>
                    <textarea id='body' name='body' required onChange={handleChange} defaultValue={newComment.body}/>
                </div>
                <button type='submit'>Submit Comment</button>
            </form>
        </div>
    )
}

export default Post