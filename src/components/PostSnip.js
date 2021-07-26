import React from 'react';
import '../style/style.css';



const PostSnip = (props) => {
    const { post } = props;

    return (
        <a href={`/post/${post._id}`} className='post-wrapper'>
            <div className='post-header'>
                <h1>{post.title }</h1>
                <h3>{post.date.slice(0,10)}</h3>
            </div>
            <div className='content-wrapper'>
                <p>{`${post.content.slice(0,200)}...`}</p>
            </div>
        </a>
    )

}

export default PostSnip;