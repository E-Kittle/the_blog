import React from 'react';
import '../style/style.css';



const Login = () => {

    return (
        <div className='form-page-wrapper'>
            <div className='login-wrapper'>
                <h1>Login</h1>
                <form>
                    <div className='form-element'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' name='username' required></input>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' required></input>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )

}

export default Login;