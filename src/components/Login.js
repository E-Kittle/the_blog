import React, { useState } from 'react';
import '../style/style.css';
import { useHistory } from 'react-router-dom';
import { login } from '../services/auth.service';

const Login = () => {

    // Router method for re-routing user
    let history = useHistory();


    // const [errors, setErrors] = useState({});
    const [user, setUser] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setUser(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }


    async function handleSubmit(e) {
        // html handles required text input so no validation required

        e.preventDefault();
        // Send the login info to the API
        const result = await login(user.username, user.password);
        console.log('in handleSubmit')
        console.log(result)
    }



    // This works. but logs 'here' and then 'in auth.service'
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     login(user.username, user.password).then(
    //         () => {
    //             console.log('here')
    //             console.log(localStorage.getItem("user"));
    //         }
    //     )
    // }

    return (
        <div className='form-page-wrapper'>
            <div className='form-wrapper login-wrapper'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-element'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' name='username' required onChange={handleChange}></input>
                        {/* <span className='errors'>{errors.username}</span> */}
                    </div>
                    <div className='form-element'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' required onChange={handleChange}></input>
                        {/* <span className='errors'>{errors.password}</span> */}
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )

}

export default Login;