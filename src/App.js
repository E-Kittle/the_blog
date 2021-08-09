import Home from './components/Home';
import Post from './components/Post';
import Nav from './components/Nav';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import PostManager from './components/PostManager';
import NewPost from './components/NewPost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { authenticateUser } from './services/auth.service'
// import axios from 'axios';



function App() {

  const [currentUser, setCurrentUser] = useState({
    id: '',
    username: '',
    email: '',
    admin: false
  })

  // Sets the currentUser following the API call in useEffect hook
  const setUser = (user) => {
    setCurrentUser({
      id: user.id,
      username: user.username,
      email: user.email,
      admin: user.admin
    })
  };

  // Triggered when logout is selected in the nav element
  const logoutUser = () => {
    setCurrentUser({
      id: '',
      username: '',
      email: '',
      admin: false
    })
  }

  useEffect(() => {
    console.log('checking token again in app.js (1)')
    authenticateUser(setUser);

  }, [])

  // When a user selects a specific route, we can either use an outside source to store the posts data
  // or we can call for it from the db within the component... 
  return (
    <Router>
      <div className='app'>
        <Nav logoutUser={logoutUser} currentUser={currentUser} />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/post/:id'
            render={(props) => (
              <Post {...props} currentUser={currentUser} />
            )} />
          <Route path='/login'
            render={(props) => (
              <Login {...props} setNewUser={setUser} />
            )} />
          <Route path='/signup' component={SignUp} />
          <Route path='/profile/:userid'
            render={(props) => (
              <UserProfile {...props} currentUser={currentUser} />
            )} />
          <Route path='/managePosts'
            render={(props) => (
              <PostManager {...props} currentUser={currentUser} />
            )} />
          <Route path='/newPost'
            render={(props) => (
              <NewPost {...props} currentUser={currentUser} />
            )} />
          <Route path='/editPost/:postid'
            render={(props) => (
              <NewPost {...props} currentUser={currentUser} />
            )} />
        </Switch>
      </div>
    </Router>


  );
}

export default App;

// MAIN CONCERNS
// Am I making too many API calls?
// 1- In general, should I store posts in redux so we don't
//  have to be making constant API calls for each individual post?
//  Downside would be that we may not have the most up to date info
//  but there may be a way to trigger a new API call every 5 minutes
//2 - Am I making too many API calls for the nav element?
//  If I can store the data in redux, then I wouldn't have to contantly
//  pull it. Or I can store it in app.js - but this will constantly be rerendered

// Things to do
/*
1 - Add 'new post' section that allows an admin to add a new post
2 - Add 'view profile' page that allows users to view the user they clicked on,
      view all of their posts, and view all of their comments
      Here: the user can edit or delete their comments or manage/delete their posts
3 - Add 'Manage Post' page for admins - From here they can go to 'new post'
4 - Add categories and subcategories for posts
5 - Allow users to sort/filter by subcategories, etc. or sort by date
6 - Allow multiple pages on homepage for 10+ posts
7 - Make it pretty


*/