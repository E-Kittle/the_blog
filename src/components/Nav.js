import React, { useEffect } from 'react';
import '../style/style.css';
import { logout } from '../services/auth.service';
import { Link } from 'react-router-dom';

const Nav = (props) => {

    const { currentUser, logoutUser } = props;

    const logoutNav = () => {
        logoutUser();
        logout();
    }

    useEffect(() => {
        // Causes component to refresh once currentUser is updated by app.js
    }, [currentUser])

    return (
        <nav>
            <div className='nav-title'>
                <Link to='/'>The Blog</Link>
            </div>
            {currentUser.username === '' ?
                // Not logged in
                <div className='nav-links'>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Sign Up</Link>
                </div>
                :
                // Logged in
                <div className='nav-links'>
                    <Link to={`/profile/myprofile`}>View Profile</Link>
                    {/* If admin- display 'New Post' link */}
                    {currentUser.admin ? <Link to='/managePosts'>Manage Posts</Link> : null}
                    <button onClick={logoutNav}>Logout</button>
                </div>
            }
        </nav>
    )
}

export default Nav