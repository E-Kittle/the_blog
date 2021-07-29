import React, { useEffect, useState } from 'react';
import '../style/style.css';
import PostSnip from '../components/PostSnip';
import { getAllPosts } from '../services/user.service';




// In the blog home 

// Here, when the user visits Home, an API call will be made
//to grab the data from the database. Upon returning with the data
// we'll map through the data and display it to the homepage

const Home = () => {


    const [posts, setPosts] = useState([]);




    // Hook to grab the posts data from the API - This is grabbed every single time the page reloads....
    useEffect(() => {
        getAllPosts()
            .then(response => {
                // console.log(response.data)
                setPosts(response.data);
            })
            .catch(error => console.log(error))
    }, []);


    return (
        <div className='home-wrapper'>
            {posts.map(post => {
                return <PostSnip post={post} key={post._id} />
            })}
        </div>

    )
}

export default Home