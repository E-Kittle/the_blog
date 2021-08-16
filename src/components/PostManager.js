import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { getUserPosts, deletePost, editPost } from '../services/user.service';
import PostManagerSnip from '../components/PostManagerSnip';
import { UserContext } from '../App';
import Post from './Post';

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

    // Triggered by user changing the published status of their post
    const editLocalPost = (e) => {
        console.log('TRIGGERED')
        console.log('would edit post ' + e.target.id)
        let index = posts.findIndex(post => post._id === e.target.id);
        let post = posts[index]
        console.log(post)
        let newPost = {
            author: post.author,
            title: post.title,
            content: post.content,
            published: !post.published,
            category: post.category._id,
            subcategory: post.subcategory,
            date: post.date
        }

        console.log(newPost)
        editPost(post._id, newPost)
            .then(response => {
                if (response.status === 200) {
                    console.log('success')

                    let allPosts = posts;
                    allPosts[index] = newPost;

                    console.log(posts[index].published)
                    console.log(`would change to: ${newPost.published}`)
                    setPosts([...allPosts]);
                }
            })
            .catch(error => {
                console.log(error)
                console.log('why')
                console.log(error.response)
                // if (error.response.status === 400) {
                //     console.log(error.response.data.errArr)
                // } else {
                //     console.log(error.response)
                // }

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
                {posts.map((post, index) => {
                    return <PostManagerSnip post={post} key={index} delPost={delPost} editLocalPost={editLocalPost} manager={true} />
                })}
            </div>


        </div>
    )
}

export default PostManager;