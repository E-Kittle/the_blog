import React from 'react';
import '../style/style.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postUserSignUp } from '../services/user.service';

const SignUp = () => {


    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confPassword: ''
    });
    const [newUser, setNewUser ] = useState({
        username: '',
        email: '',
        password: '',
        confPassword: '',
        admin: false
    })

    // use the history hook to redirect user in handleSubmit() function
    // - Will redirect user to the login page after successful account
    // creation
    let history = useHistory();

    // Function to handle user changing any input field
    // on the sign-up page
    const handleChange = (e) => {
        // Radio button was selected, update the state
        if (e.target.type === 'radio') {
            if (e.target.id === 'commenting'){
                setNewUser(prevState => ({
                    ...prevState,
                    admin: false
                }))
            }
            else {
                setNewUser(prevState => ({
                    ...prevState,
                    admin: true
                }))
            }
        } else {
            // Text input changed, update the state
            setNewUser(prevState => ({
                ...prevState,
                [e.target.id]: e.target.value
            }))
        }

    }

    // Function to handle user creating a new account
    const handleSubmit = (e) => {

        console.log()
        // Flag to indicate whether the user input passed validation
        // if any validation fails, this flag is set to false
        let passed = true;

        // Data validation for username
       if (newUser.username.length < 3 || newUser.username.length > 20) {
           passed = false;
            setErrors(prevState => ({
                ...prevState,
                username: 'Username must be between 3-20 characters'
            }));
        }

        // Data validation for password length
        if (newUser.password.length < 8) {
            passed = false;
            setErrors(prevState => ({
                ...prevState,
                password: 'Password must be at least 8 characters'
            }));
        }

        // Data validation for password confirmation
        if (newUser.password !== newUser.confPassword) {
            passed = false;
            setErrors(prevState => ({
                ...prevState,
                confPassword: 'Passwords must match'
            }));
        }

        if(!passed) {
            // User failed data validation.
            // Display errors to user and allow another attempt 
            e.preventDefault();
        } else {
            // User input passed validation, create user in database and
            // redirect to login page
            
            // Create user object in database format
            let user = {
                username: newUser.username,
                password: newUser.password,
                email: newUser.email,
                admin: newUser.admin
            }

            e.preventDefault();
            postUserSignUp(user)
            .then(response => {
                if(response.status === 200) {
                    history.push('/login')
                }
            })
            .catch(error => console.log(error)
            )

        }

    }

    return (
        <div className='form-page-wrapper'>
            <div className='form-wrapper signup-wrapper'>
                <h1>Sign-Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-element'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' name='username' required onChange={handleChange}></input>
                        <span className='errors'>{errors.username}</span>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' required onChange={handleChange}></input>
                        <span className='errors'>{errors.email}</span>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' required onChange={handleChange}></input>
                        <span className='errors'>{errors.password}</span>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='confPassword'>Confirm Password</label>
                        <input type='password' id='confPassword' name='confPassword' required onChange={handleChange}></input>
                        <span className='errors'>{errors.confPassword}</span>
                    </div>
                    <div className='form-element form-radios'>
                        <p>What type of account do you want?</p>
                        <div className='signup-radios'>
                            <label htmlFor='commenting'>Commenting Only</label>
                            <input type='radio' id='commenting' name='accountType' required onChange={handleChange}></input>
                        </div>
                        <div className='signup-radios'>
                            <label htmlFor='posting'>Commenting and Posting</label>
                            <input type='radio' id='posting' name='accountType' required onChange={handleChange}></input>
                        </div>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )

}

export default SignUp;