import React from 'react';


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

    const { posts, comments } = props;


    return (
        <div className='post-page-wrapper'>
            <div className='post-section'>
                {posts.map(post => {
                    if (post._id===props.match.params.id){
                        return (
                        <h1>{post.title}</h1>
                        )
                    }
                })}
            </div>
        </div> 

    )
}

export default Post