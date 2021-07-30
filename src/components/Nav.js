import React, { useEffect } from 'react';
import '../style/style.css';
import { logout } from '../services/auth.service';

const Nav = (props) => {

    const { currentUser, logoutUser } = props;

    const logoutNav = () => {
        logoutUser();
        logout();
        console.log('would logout')
    }

    useEffect(() => {
        console.log('in nav')
    }, [])

    return (
        <nav>
            <div className='nav-title'>
                <a href='/'>The Blog</a>
            </div>
                {currentUser.username === '' ?
                    // Not logged in
                    <div className='nav-links'>
                        <a href='/login'>Login</a>
                        <a href='/signup'>Sign Up</a>
                    </div>
                    :
                    // Logged in
                    <div className='nav-links'>
                        <a href={`/profile/${currentUser.id}`}>View Profile</a>
                        {/* If admin- display 'New Post' link */}
                        {currentUser.admin? <a href='/createPost'>New Post</a>: null}
                        <button onClick={logoutNav}>Logout</button>
                    </div>
                }
        </nav>
    )
}

export default Nav