import React from 'react';
import '../style/style.scss';
import { useHistory, Link } from 'react-router-dom';


const PostManagerSnip = (props) => {
    const { post, delPost, editLocalPost } = props;

    let history = useHistory();

    const redirectForEditing = (e) => {
        e.preventDefault();
        history.push(`/editPost/${e.target.id}`)
    }



    // Add a section to toggle whether something is published or not
    return (
        <div className='post-wrapper' style={{cursor:'default'}} key={post._id}>
            <div className='manager-button-wrapper'>
                <button className='button-style' id={post._id} onClick={redirectForEditing}>Edit</button>
                <button className='button-style' id={post._id} onClick={delPost}>Delete</button>
            </div>
            <div className='post-header'>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
                <h3>{post.date.slice(0, 10)}</h3>
            </div>
            <div className='content-wrapper'>
                <p>{`${post.content.slice(0, 200)}...`}</p>
            </div>
            <div className='switch-container'>
                <h4>Published: </h4>
                <label className="switch">
                    <input type="checkbox" checked={post.published} id={post._id} onChange={editLocalPost}/>
                        <span className="slider round"></span>
                </label>
            </div>
        </div>
            )

}

            export default PostManagerSnip;