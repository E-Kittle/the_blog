import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { getUserPosts, deletePost } from '../services/user.service';
import PostManagerSnip from '../components/PostManagerSnip';
import { UserContext } from '../App';

const PostManager = (props) => {

    // Grab UserContext from app.js and destructure currentUser from it
    const userContext = useContext(UserContext);
    const { currentUser } = userContext;

    // State to hold the users posts
    const [posts, setPosts] = useState([]);

    const delPost = (e) => {
        e.preventDefault();
        deletePost(e.target.id)
            .then(results => {
                let index = posts.findIndex(post => post._id === e.target.id)
                let newPosts = posts;
                newPosts.splice(index, 1)
                setPosts([...newPosts])
            })
            .catch(err => {
                console.log('error')
                console.log(err)
            })
    }


    useEffect(() => {

        if (currentUser.id === '') {
            // Wait for App.js to finish grabbing currentUser
        } else {
            getUserPosts(currentUser)
                .then(results => {
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
            {currentUser.username === '' ? null : <h1 className='user-title'>{currentUser.username}'s Blog Posts</h1>}
            <Link to='/newPost' className='button-style link-button'>Add New Post</Link>
            <div className='manage-post-wrapper'>
                {posts.length === 0 ? <h4>No Posts Found</h4> : <h4 className='section-title'>Posts</h4>}
                {posts.map(post => {
                    return <PostManagerSnip post={post} key={post._id} delPost={delPost} manager={true} />
                })}
            </div>


        </div>
    )
}

export default PostManager;