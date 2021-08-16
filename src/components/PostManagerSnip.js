import React, { useState } from 'react';
import '../style/style.scss';
import { useHistory, Link } from 'react-router-dom';
import { editPost } from '../services/user.service';


const PostManagerSnip = (props) => {
    const { post, delPost } = props;

    const [published, setPublished] = useState(post.published);

    let history = useHistory();

    const redirectForEditing = (e) => {
        e.preventDefault();
        history.push(`/editPost/${e.target.id}`)
    }

    const editLocalPost = (e) => {

        let newPost = {
            author: post.author,
            title: post.title,
            content: post.content,
            published: !published,
            category: post.category._id,
            subcategory: post.subcategory,
            date: post.date
        }

        editPost(post._id, newPost)
            .then(response => {
                if (response.status === 200) {
                    // Post was successfully updated in API.
                    // Change local state
                    setPublished(newPost.published)
                }
            })
            .catch(error => {
                console.log(error.response)

            })

    }


    // Add a section to toggle whether something is published or not
    return (
        <div className='post-wrapper' style={{ cursor: 'default' }} key={post._id}>
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
                    <input type="checkbox" checked={published} id={post._id} onChange={editLocalPost} />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )

}

export default PostManagerSnip;