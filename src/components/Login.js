import React, { useState } from 'react';
import '../style/style.css';
import { useHistory } from 'react-router-dom';
import { login } from '../services/auth.service';

const Login = (props) => {

    // Router method for re-routing user
    let history = useHistory();

    // Destructure props
    const { setNewUser } = props;

    // State to hold the user input for the login as well as the
    // appropriate errors if user authentication fails
    const [user, setUser] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ auth: '' });

    // Function to capture changes made to the input fields and
    // save them in state
    const handleChange = (e) => {
        setUser(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }




    // This works. but logs 'here' and then 'in auth.service'
    const handleSubmit = (e) => {
        e.preventDefault();

        login(user.username, user.password)
            .then(response => {
                // Authentication was successful, clear errors state and redirect to homepage
                if (response.status === 200) {
                    
                    //Resets the errors state
                    setErrors({ auth: '' });

                    // Sets the new user in App.js
                    setNewUser(response.data.user);
                    // Redirects the user to the homepage
                    history.push('/');
                }
                // Authentication failed. Display error message for user
                else if (response.status === 400) {
                    setErrors({ auth: response.data.message })
                }
            }
            )
    }

    return (
        <div className='form-page-wrapper'>
            <div className='form-wrapper login-wrapper'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-element'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' name='username' required onChange={handleChange}></input>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' required onChange={handleChange}></input>
                        <span className='errors'>{errors.auth}</span>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )

}

export default Login;