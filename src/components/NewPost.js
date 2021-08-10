import React from 'react';
import '../style/style.css';
import { useState, useEffect, useContext } from 'react';
import { getAllCategories, postNewPost } from '../services/user.service'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
// import { postUserSignUp } from '../services/user.service';


/*
        NECESSARY DATA
        author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        title: {type: String, required: true, maxLength: 150, unique: true},
        content: {type: String, required: true},
        date: {type: Date, required: true},
        published: {type: Boolean, required: true},
        category: {type: Schema.Types.ObjectId, ref:'Category', required:true},
        subcategory: {type:String, required: true}
*/
const SignUp = () => {

    let history = useHistory();


    // Grab UserContext from app.js and destructure currentUser from it
    const userContext = useContext(UserContext);
    const { currentUser } = userContext;

    // State to hold the categories and errors
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({
        title: '',
        content: ''
    });

    const [newPost, setNewPost] = useState({
        author: '',             //To be set by useEffect from currentUser
        title: '',
        content: '',
        published: false,
        category: '',
        subcategory: '',
    })

    const handleChange = (e) => {
        if (e.target.type === 'radio' && e.target.name === 'published') {
            if(e.target.id === 'yes') {
                setNewPost({
                    ...newPost,
                    published:true
                })
            } else {
                setNewPost({
                    ...newPost,
                    published:false
                })
            }
        } else if (e.target.type === 'radio' && e.target.name === 'subcategory') {
            setNewPost({
                ...newPost,
                category: e.target.className,
                subcategory: e.target.id
            })
        } else {
            setNewPost({
                ...newPost,
                [e.target.id]: e.target.value
            })
        }
    }

    const handleSubmit = (e) => {
        // The radio buttons are set to required, so they do not need to be validated
        e.preventDefault();
        let passed=true;

        // Verify title is at least 3 characters long and less than 150 characters
        if ((newPost.title.length < 3 || newPost.title.length >= 150) || newPost.content.length < 10) {

            passed=false;
            let titleErr = '';
            let contentErr = '';

            if (newPost.title.length < 3 || newPost.title.length >= 150) {
                titleErr = 'Title must be between 3 and 150 characters'
            }
            if (newPost.content.length < 10) {
                contentErr = 'Content must be at least 10 characters'
            }
            setErrors({
                title: titleErr,
                content: contentErr,
            })
        }
     
        if (passed) {
            console.log('submitting new post in NewPost component')
            postNewPost(newPost)
            .then(response => {
                if(response.status === 200) {
                    history.push('/managePosts')
                }
            })
            .catch(error => {
                /*
                if (error.response.status === 400) {
                    console.log(error.response.data.errArr)
                } else {
                    console.log(error.response)
                }
                */
               console.log('failed?')
               console.log(error)
               console.log(error.response)
            })
            
        }
    }
/*
    .then(response => {
        // Clear newComment - This clears the input fields
        if (currentUser.username !== '') {
            setNewComment({ posterid: currentUser.id, body: '' });
        } else {
            setNewComment({ posterid: '', body: '' });
        }
    })
    .catch(error => {
        if (error.response.status === 400) {

            //This returns the error data to a 400 request
            //This will be triggered if the comment body is missing
            //However, this will never be triggered because
            //the text input has 'required'
            console.log(error.response.data.errArr);
        }
    });

*/

    // Used to set the authors id to that of the currentUser
    useEffect(() => {
        if (currentUser === '') {
            return;     //currentUser hasn't been set yet, wait for it to be set
        } else {
            setNewPost({
                ...newPost,
                author: currentUser.id,
            })
        }
        // Also needs to grab the associated post information, set it to newPost, and load it into the form
    }, [currentUser])

    // Effect hook to grab the categories from the backend
    useEffect(() => {
        getAllCategories()
            .then(response => {
                setCategories(response.data.categories);
            })
            .catch(error => console.log(error))
    }, [])

    // For funsies
    // useEffect(() => {
    //     // console.log(newPost)
    //     console.log(errors)
    // }, [newPost, errors])

    return (
        <div className='form-page-wrapper post-form-wrapper'>
            <div className='form-wrapper new-post-wrapper'>
                <h1>New Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-element'>
                        <label htmlFor='title'>Title</label>
                        <input type='text' id='title' name='title' value={newPost.title} required onChange={handleChange}></input>
                        <span className='errors'>{errors.title}</span>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='content'>Content</label>
                        <textarea id='content' name='content' required onChange={handleChange}></textarea>
                        <span className='errors'>{errors.content}</span>
                    </div>
                    <div className='form-radios'>
                        <div className='form-element form-publish-radios'>
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
                        <div className='form-element form-radios cat-radios'>
                            {categories.map(cat => {
                                return (
                                    <div className='cat-radio-container' key={cat._id}>
                                        <label>{cat.name}</label>
                                        {cat.subcategories.length === 0 ? <p>No Subcategories Found</p> : null}
                                        {cat.subcategories.map(subcat => {
                                            return (
                                                <div key={subcat}>
                                                    <label htmlFor={subcat}>{subcat}</label>
                                                    <input type='radio' id={subcat} name='subcategory' className={cat._id} required onChange={handleChange}></input>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                )
                            })}
                            <Link to='/manageCategories'>Manage Categories</Link>
                        </div>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )

}

export default SignUp;