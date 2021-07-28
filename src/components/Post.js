import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';

// In POST
// We'll grab the appropriate post from the database... 
//  Seems inefficient
//      Can either store it in an outside area
//      in state - We can store everything in app.js?
//      or cache it? 
// The problem with any of these is that we may not get the most
// up to date results. Probably not a problem with a blog but
// with a social media app, that may be a problem


// Then, query the database for all appropriate comments
// and display them using <Comment />


// In the future, we won't have to check if the comments are
// appropriate for this post
const Post = (props) => {

    // Destructure props
    const { posts } = props;

    // Set state variable for the comments related to this specific post
    const [comments, setComments] = useState([]);

    // Set state variable for a new comment
    const [newComment, setNewComment] = useState({name: '', comment:''})

    // Function to handle user entering a new comment
    const handleChange = (event) => {
        let commentChange = newComment;
        commentChange[event.target.id] = event.target.value;
        setNewComment(commentChange);

    }

    // Function to sanitize the data
    function sanitize(string) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return string.replace(reg, (match)=>(map[match]));
      }

    // Function to handle user submitting a new comment
    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate data, submit to database, if successful submit: clear form and reload DOM, if not successful:
        //Display error and keep data

        // Sanitize data
        let sanName = sanitize(newComment.name);
        let sanComment = sanitize(newComment.comment);
        setNewComment({name:sanName, comment:sanComment});

        // Submit POST request to database
        // Question: Since setState is async do I need to sanitize the data during onChange?
        // I also need to set these up as environmental variables...
        // Read this in the AM https://medium.com/@ai.ashkan9473/environment-variables-in-client-side-6a6ff51c6085
        axios.post(`https://peaceful-wave-73796.herokuapp.com/api/posts/${props.match.params.id}/comments`, newComment)
        .then(response => {
            setNewComment({name:'', comment:''}); console.log(response)
        })
        .catch(error => {
            
            console.error('There was an error!', error);
        });
    }


    // Hook to grab the comment data from the API
    //   Need to figure out - component did unmount for this section
    useEffect(() => {
        axios.get(`https://peaceful-wave-73796.herokuapp.com/api/posts/${props.match.params.id}/comments`)
            .then(response => {
                setComments(response.data.comments);
            })
            .catch(error => console.log(error))
    }, [props.match.params.id]);


    return (
        <div className='post-page-wrapper'>

            {/* Filter through the posts array for the selected post, then output its JSX */}
            {posts.filter(post => post._id === props.match.params.id)
                .map(filteredPost => {
                    return (
                        <div className='post-section' key={filteredPost._id}>
                            <h1>{filteredPost.title}</h1>
                            <p>{filteredPost.date.slice(0, 10)}</p>
                            <p>{filteredPost.content}</p>
                        </div>
                    )
                })
            }

            {/* Display each of the comments for the posts */}
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
                    <input id='name' name='name' placeholder='name/username (optional)' onChange={handleChange} />
                </div>
                <div className='form-element'>
                    <label htmlFor='comment'>Comment:</label>
                    <textarea id='comment' name='comment' required onChange={handleChange}  /> 
                </div>
                <button type='submit'>Submit Comment</button>
            </form>
        </div>
    )
}

export default Post