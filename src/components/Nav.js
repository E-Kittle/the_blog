import React from 'react';
import '../style/style.css';

const Nav = (props) => {

    const { currentUser } = props;

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
                        <a href='/profile'>View Profile</a>
                        {/* If admin- display 'New Post' link */}
                        {currentUser.admin? <a href='/createPost'>New Post</a>: null}
                        <a href='/logout'>Logout</a>
                    </div>
                }
        </nav>
    )
}

export default Nav