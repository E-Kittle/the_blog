import React, { useState, useEffect, useContext } from 'react';
import { getProfile } from '../services/user.service';
import ProfileComment from '../components/ProfileComment';
import PostSnip from '../components/PostSnip';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const UserProfile = (props) => {

    // Grab UserContext from app.js and destructure currentUser from it
    const userContext = useContext(UserContext);
    const { currentUser } = userContext;

  // useState for the user, their posts, and their comments
  const [profileUser, setProfileUser] = useState({ username: '' });
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (props.match.params.userid === 'myprofile') {
      // Then, we use the currentUsers userid
      if (currentUser.id === ''){
        // useEffect from App.js hasn't been called yet, wait until currentUser has
        // all data
        console.log('holdup')
      } else if (currentUser.id !== '') {
          // currentUser has current data - Make the API call
        console.log('grabbing currentUsers data in UserProfile.js')
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
      }

    } else {    // Not current user so make API call with param
      console.log('not a match in UserProfile')
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
      // We use the id of the paramater to make the API call

    }
  }, [props.match.params.userid, currentUser])



  return (
    <div className='profile-page-wrapper'>
      {/* Section for the main profile data */}
      <div className='profile-wrapper'>
        <div className='blog-title'>
          {currentUser.username !== profileUser.username ? <h1>{profileUser.username}</h1> : <h1 className='user-title'>My Profile</h1>}
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
          {currentUser.username === profileUser.username? <Link to='/managePosts' className='button-style link-button'>Manage Posts</Link> : null}
          {posts.length === 0 && currentUser.username === profileUser.username? <h2>No Posts by User</h2> : null}
          {posts.map(post => <PostSnip post={post} key={post._id} manager={true}/>)}

          </div>
    </div>
  )
}

export default UserProfile;