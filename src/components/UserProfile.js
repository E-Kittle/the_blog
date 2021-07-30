import React, { useState, useEffect } from 'react';


const adminTestData = {
  user: { username: 'monstera', admin: true },
  posts: [{ title: 'Post1', content: 'Lots of content for post1', published: true }, { title: 'Post2', content: 'Lots of content for post2', published: false }, { title: 'Post3', content: 'Lots of content for post3', published: true }],
  comments: [{ comment: 'here is a boring comment' }, { comment: 'here is a lame comment' }, { comment: "I'm so tired" }, { comment: 'API CALLS SUCK' }]
};


/*
Plan:
  grab userid from the url - If it matches currentUser - display props, otherwise API call
  Make an API call to grab all the users comments
  Make an API call to grab all of their posts - only if they are an admin
*/


const UserProfile = (props) => {

  // Destructure currentUser
  const { currentUser } = props;

  // useState for the user, their posts, and their comments
  const [profileUser, setProfileUser] = useState({ username: '' });
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  // Should make it so guests can't see profiles

  // Tackle after nap
  // first: display the correct users info
  // In Testing, check if the current userid matches the searched for user
  // if matches: Use their id to load the post and comment data - since they are managers also give edit and delete buttons to be implemented later
  //    Maybe just an 'manage posts' button at the top or bottom of the post section
  // if it doesn't match, call the API to grab the users data, grab their comments and(?) posts





  // useEffect to grab the current user
  useEffect(() => {
    console.log('useEffect in UserProfile');
    if (currentUser.id !== props.match.params.userid) {
      // Grab the data from the API
    } else {
      setProfileUser({ username: currentUser.username });
    }
  }, [])

  // Problem: useEffects run at different rates. Current: effects in UserProfile, then effects in App.js, finally effects in Nav.js
  //By placing currentUser in the JSX it causes this to be run last. New path: App.js, Nav.js, UserProfile.js
  return (
    <div className='profile-page-wrapper'>
      {/* Section for the main profile data */}
      <div className='profile-wrapper'>
        <div className='blog-title'>
          {currentUser.id === props.match.params.userid ? <h1>Your Profile</h1> : <h1>{profileUser.username}'s Blog</h1>}
        </div>
      </div>

      {/* Section for their comments */}
      <div className='comment-section'>

      </div>


    </div>
  )
}

export default UserProfile;