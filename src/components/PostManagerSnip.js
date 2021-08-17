import React, { useState } from 'react';
import '../style/style.scss';
import { useHistory, Link } from 'react-router-dom';
import { editPost } from '../services/user.service';
import htmlDecode from '../services/formatting';


const PostManagerSnip = (props) => {
    // Desctructure props
    const { post, delPost } = props;

    // State to hold whether the component has been published or not
    const [published, setPublished] = useState(post.published);

    // react-router-dom to redirect user when editting a post
    let history = useHistory();

    // Method that redirects a user when they click the edit button
    const redirectForEditing = (e) => {
        e.preventDefault();
        history.push(`/editPost/${e.target.id}`)
    }

    // Function to toggle whether a post is published or not
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

        // API call to update post published status in the backend
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


    // JSX to display the post data a
    return (
        <div className='post-wrapper' style={{ cursor: 'default' }} key={post._id}>

            {/* Buttons for deleting or editting a post */}
            <div className='manager-button-wrapper'>
                <button className='button-style' id={post._id} onClick={redirectForEditing}>Edit</button>
                <button className='button-style' id={post._id} onClick={delPost}>Delete</button>
            </div>

            {/* Post data */}
            <div className='post-header'>
                <Link to={`/post/${post._id}`}>{htmlDecode(post.title)}</Link>
                <h3>{post.date.slice(0, 10)}</h3>
            </div>
            <div className='content-wrapper'>
            <div dangerouslySetInnerHTML={{__html:htmlDecode(`${post.content.slice(0, 200)}...`)}} />
            </div>

            {/* checkbox toggle to easily alter whether a post is published or not */}
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