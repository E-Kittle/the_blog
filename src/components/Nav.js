import React, { useEffect, useContext } from 'react';
import '../style/style.scss';
import { logout } from '../services/auth.service';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Nav = () => {

    // Grab UserContext from app.js and destructure currentUser from it
    const userContext = useContext(UserContext);
    const { currentUser } = userContext;

    const logoutNav = () => {
        // 'logout' user in App.js state
        userContext.userDispatch({type:'logoutUser'})

        // Remove the token from localstorage
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
                    <button id='logout-button' onClick={logoutNav}>Logout</button>
                </div>
            }
        </nav>
    )
}

export default Nav