import React from 'react';
import '../style/style.css';


const Nav = () => {
    return (
        <nav>
            <div className='nav-title'>
                <a href='/'>The Blog</a>
            </div>

            {/* When the user is logged in this needs to change... */}
            {/* To say: view profile - logout */}
            {/* And if admin: 'create post' */}
            <div className='nav-links'>
                <a href='/login'>Login</a>
                <a href='/signup'>Sign Up</a>
            </div>
        </nav>
    )
}

export default Nav