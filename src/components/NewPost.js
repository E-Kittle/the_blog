import React from 'react';
import '../style/style.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { postUserSignUp } from '../services/user.service';

const SignUp = (props) => {

    // Destructure props
    const { currentUser } = props;

    const [errors, setErrors] = useState({
        title: '',
        content: ''
    });

    const [newPost, setNewPost ] = useState({
        author: '',             //To be set by useEffect from currentUser
        title: '',
        content: '',
        published: false
    })

    const handleChange = (e) => {

    } 

    const handleSubmit = (e) => {

    }

    useEffect(() => {
        // Needs to grab currentUser and set it to author
        // Also needs to grab the associated post information, set it to newPost, and load it into the form
    })

    return (
        <div className='form-page-wrapper'>
            <div className='form-wrapper signup-wrapper'>
                <h1>New Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-element'>
                        <label htmlFor='title'>Title</label>
                        <input type='text' id='title' name='title' required onChange={handleChange}></input>
                        <span className='errors'>{errors.title}</span>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='content'>Content</label>
                        <textarea id='content' name='content' required onChange={handleChange}></textarea>
                        <span className='errors'>{errors.content}</span>
                    </div>
                    <div className='form-element form-radios'>
                        <p>Do you want to publish this post immediately?</p>
                        <div className='signup-radios'>
                            <label htmlFor='yes'>Yes</label>
                            <input type='radio' id='yes' name='published' required onChange={handleChange}></input>
                        </div>
                        <div className='signup-radios'>
                            <label htmlFor='no'>No</label>
                            <input type='radio' id='no' name='published' required onChange={handleChange}></input>
                        </div>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )

}

export default SignUp;