
import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../services/user.service';
import PostManagerSnip from '../components/PostManagerSnip';

const PostManager = (props) => {

    // Destructure props
    const { currentUser } = props;

    // State to hold the users posts
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        if (currentUser.id === '') {
            // Wait for App.js to finish grabbing currentUser
        } else {
            getUserPosts(currentUser)
            .then(results => {
                console.log(results.data)
                setPosts(results.data);
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [currentUser])

    // Currently using postsnip but I'll probably want to use a special
    // component for this
    return (
        <div className='manager-container'>
            {currentUser.username === ''? null : <h3>{currentUser.username}'s Blog Posts</h3>}
            <a href='/newPost'>Add New Post</a>
            <div className='manage-post-wrapper'>
                {posts.length === 0 ? <h4>No Posts Found</h4> : <h4>Posts</h4>}
                {posts.map(post => {
                    return <PostManagerSnip post={post} key={post._id} />
                })}
            </div>

        
        </div>
    )
}

export default PostManager;