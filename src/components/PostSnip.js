import React from 'react';
import '../style/style.css';
import { Link } from 'react-router-dom';



const PostSnip = (props) => {
    const { post } = props;

    return (
        <Link to={`/post/${post._id}`} className='post-wrapper' key={post._id}>
            <div className='post-header'>
                <h1>{post.title }</h1>
                <h3>{post.date.slice(0,10)}</h3>
            </div>
            <div className='content-wrapper'>
                <p>{`${post.content.slice(0,200)}...`}</p>
            </div>
        </Link>
    )

}

export default PostSnip;