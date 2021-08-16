import React from 'react';
import Home from './components/Home';
import Post from './components/Post';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import PostManager from './components/PostManager';
import NewPost from './components/NewPost';
import CategoryManager from './components/CategoryManager';
import { Switch, Route } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './App';


const Routes = () => {

  // Grab UserContext from app.js and destructure currentUser from it
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/post/:id' component={Post} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SignUp} />

      {/* If user is not logged in, prevent user from accessing protected pages */}
      <Route path='/managePosts' component={currentUser.username === '' ?Login :PostManager} />
      <Route path='/profile/:userid' component={currentUser.username === '' ?Login :UserProfile} />
      <Route path='/newPost' component={currentUser.username === '' ?Login :NewPost} />
      <Route path='/editPost/:postid' component={currentUser.username === '' ?Login :NewPost} />
      <Route path='/manageCategories' component={currentUser.username === '' ?Login :CategoryManager} />)
    </Switch>
  )
}

export default Routes