import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    // Hook to grab the comment data from the API
    useEffect(() => {
        axios.get(`https://pacific-citadel-88479.herokuapp.com/api/posts/${props.match.params.id}/comments`)
            .then(response => {
                setComments(response.data.comments);
            })
            .catch(error => console.log(error))
    }, [props.match.params.id]);

    //   Need to figure out - component did unmount for this section

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
                        <div className='comment-container' key={comment._id} >
                            <h2>{comment.name}</h2>
                            <p>{comment.comment}</p>
                            <p>{comment.date.slice(0, 10)}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Post