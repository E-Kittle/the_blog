import React from 'react';
import '../style/style.css';



const PostManagerSnip = (props) => {
    const { post } = props;



    // Add a section to toggle whether something is published or not
    return (
        <a href={`/post/${post._id}`} className='post-wrapper' key={post._id}>
            <div className='manager-button-wrapper'>
                <button>Edit Post </button>
                <button>Delete Post</button>
            </div>
            <div className='post-header'>
                <h1>{post.title}</h1>
                <h3>{post.date.slice(0, 10)}</h3>
            </div>
            <div className='content-wrapper'>
                <p>{`${post.content.slice(0, 200)}...`}</p>
            </div>
        </a>
    )

}

export default PostManagerSnip;