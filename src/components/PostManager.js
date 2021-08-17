import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { getUserPosts, deletePost, editPost } from '../services/user.service';
import PostManagerSnip from '../components/PostManagerSnip';
import { UserContext } from '../App';
import htmlDecode from '../services/formatting';

const PostManager = (props) => {

    // Grab UserContext from app.js and destructure currentUser from it
    const userContext = useContext(UserContext);
    const { currentUser } = userContext;

    // State to hold the users posts
    const [posts, setPosts] = useState([]);

    // Triggered by 'delete' button to remove a post from the backend
    const delPost = (e) => {
        e.preventDefault();
        deletePost(e.target.id)
            .then(results => {
                // Manually remove the deleted post from the posts state
                // Since only the user has access to this page, we don't have to worry about another API call due to changed data
                let index = posts.findIndex(post => post._id === e.target.id)
                let newPosts = posts;
                newPosts.splice(index, 1)
                setPosts([...newPosts])
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Effect hook to grab the current users posts
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

    // JSX to display each of the users posts
    return (
        <div className='manager-container'>
            {currentUser.username === '' ? null : <h1 className='user-title'>{htmlDecode(currentUser.username)}'s Blog Posts</h1>}
            <Link to='/newPost' className='button-style link-button'>Add New Post</Link>
            <div className='manage-post-wrapper'>
                {posts.length === 0 ? <h4>No Posts Found</h4> : <h4 className='section-title'>Posts</h4>}
                {posts.map((post, index) => {
                    return <PostManagerSnip post={post} key={index} delPost={delPost} manager={true} />
                })}
            </div>


        </div>
    )
}

export default PostManager;