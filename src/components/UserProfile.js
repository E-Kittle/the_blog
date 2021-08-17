import React, { useState, useEffect, useContext } from 'react';
import { getProfile } from '../services/user.service';
import ProfileComment from '../components/ProfileComment';
import PostSnip from '../components/PostSnip';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import htmlDecode from '../services/formatting';

const UserProfile = (props) => {

    // Grab UserContext from app.js and destructure currentUser from it
    const userContext = useContext(UserContext);
    const { currentUser } = userContext;

  // useState for the user, their posts, and their comments
  const [profileUser, setProfileUser] = useState({ username: '' });
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  // Effect hook to grab user profile data
  useEffect(() => {

    // Checks if the current user is viewing their profile
    if (props.match.params.userid === 'myprofile') {

      // Grabs current users data from api
        getProfile(currentUser.id)
        .then(results => {
          setProfileUser(results.data.user);
          if (results.data.comments !== undefined) { //User has comments
            setComments(results.data.comments);
          }
          if (results.data.posts !== undefined) {  //User is admin and has posts
            setPosts(results.data.posts)
          }
        })
        .catch(err => {
          console.log(err.response)
        })
      

    } else {    // Not current user so make API call with param
      getProfile(props.match.params.userid)
      .then(results => {
          setProfileUser(results.data.user);
          if (results.data.comments !== undefined) { //User has comments
            console.log(results.data.comments)
            setComments(results.data.comments);
          }
          if (results.data.posts !== undefined) {  //User is admin and has posts
            setPosts(results.data.posts)
          }
        })
        .catch(err => {
          console.log(err.response)
        })

    }
  }, [props.match.params.userid, currentUser])



  return (
    <div className='profile-page-wrapper'>
      {/* Section for the main profile data */}
      <div className='profile-wrapper'>
        <div className='blog-title'>
          {props.match.params.userid !== 'myprofile'? <h1 className='user-title'>{htmlDecode(profileUser.username)}</h1> : <h1 className='user-title'>My Profile</h1>}
        </div>
      </div>

      {/* Section for their comments */}
      <div className='comment-section'>
        <h1 className='section-title'>Comments</h1>
        <div className='comment-wrapper profile-comments'>
          {comments.length === 0 ?
            <h3>User has no comments</h3>
            :
            null
          }
          {comments.map(comment => {
            return (
              <ProfileComment comment={comment} key={comment._id} />
            )
          })}

        </div>
      </div>
      {/* Section for their Posts */}
          <div className='profile-section'>
          {profileUser.admin ? <h1 className='section-title'>Blog Posts</h1> : null}
          {currentUser.username === profileUser.username && profileUser.admin? <Link to='/managePosts' className='button-style link-button'>Manage Posts</Link> : null}
          {posts.length === 0 && currentUser.username === profileUser.username? <h2>No Posts by User</h2> : null}
          {posts.map(post => <PostSnip post={post} key={post._id} manager={true}/>)}

          </div>
    </div>
  )
}

export default UserProfile;