import React from 'react';
import '../style/style.css';
import PostSnip from '../components/PostSnip';





// In the blog home 

// Here, when the user visits Home, an API call will be made
//to grab the data from the database. Upon returning with the data
// we'll map through the data and display it to the homepage

const Home = (props) => {

    const { posts } = props;
    
    return (
        <div className='home-wrapper'>
            {posts.map(post => {
                    return <PostSnip post={post} key={post._id}/>
            })}
        </div>

    )
}

export default Home