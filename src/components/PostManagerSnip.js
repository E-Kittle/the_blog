import React from 'react';
import '../style/style.scss';
import { useHistory, Link } from 'react-router-dom';


const PostManagerSnip = (props) => {
    const { post, delPost, editPost } = props;

    let history = useHistory(); 
    
    const redirectForEditing = (e) => {
        e.preventDefault();
        console.log(`would edit: ${e.target.id}`)
        history.push(`/editPost/${e.target.id}`)
    }


    // Add a section to toggle whether something is published or not
    return (
        <Link to={`/post/${post._id}`} className='post-wrapper' key={post._id}>
            <div className='manager-button-wrapper'>
                <button id={post._id} onClick={redirectForEditing}>Edit Post </button>
                <button id={post._id} onClick={delPost}>Delete Post</button>
            </div>
            <div className='post-header'>
                <h1>{post.title}</h1>
                <h3>{post.date.slice(0, 10)}</h3>
            </div>
            <div className='content-wrapper'>
                <p>{`${post.content.slice(0, 200)}...`}</p>
            </div>
        </Link>
    )

}

export default PostManagerSnip;