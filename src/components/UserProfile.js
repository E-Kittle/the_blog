import React, { useState, useEffect } from 'react';
import { getProfile } from '../services/user.service';
import Comment from '../components/Comment';
import PostSnip from '../components/PostSnip';

const UserProfile = (props) => {

  // Destructure currentUser
  const { currentUser } = props;

  // useState for the user, their posts, and their comments
  const [profileUser, setProfileUser] = useState({ username: '' });
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (props.match.params.userid === 'myprofile') {
      // Then, we use the currentUsers userid


    } else {    // Not current user so make API call with param
      getProfile(props.match.params.userid)
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
      // We use the id of the paramater to make the API call

    }
  }, [props.match.params.userid])



  return (
    <div className='profile-page-wrapper'>
      {/* Section for the main profile data */}
      <div className='profile-wrapper'>
        <div className='blog-title'>
          <h1>{profileUser.username}</h1>
        </div>
      </div>

      {/* Section for their comments */}
      <div className='comment-section'>
        <h1 className='section-title'>Comments</h1>
        <div className='comment-wrapper'>
          {comments.length === 0 ?
            <h3>User has no comments</h3>
            :
            null
          }
          {comments.map(comment => {
            return (
              <Comment comment={comment} key={comment._id} />
            )
          })}

        </div>
      </div>
      {/* Section for their Posts */}
          <div className='profile-section'>

          {posts.length !== 0 ? <h1 className='section-title'>Blog Posts</h1> : null}
          {posts.map(post => <PostSnip post={post} key={post.id}/>)}

          </div>
    </div>
  )
}

export default UserProfile;