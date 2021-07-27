import React from 'react';
import '../style/style.css';



const SignUp = () => {
    return (
        <div className='form-page-wrapper'>
            <div className='signup-wrapper'>
                <h1>Sign-Up</h1>
                <form>
                    <div className='form-element'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' name='username' required></input>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' required></input>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' required></input>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='confPassword'>Confirm Password</label>
                        <input type='password' id='confPassword' name='confPassword' required></input>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='commenting'>Commenting Only</label>
                        <input type='radio' id='commenting' name='accountType' required></input>
                        <label htmlFor='posting'>Commenting and Posting</label>
                        <input type='radio' id='posting' name='accountType' required></input>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )

}

export default SignUp;