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


const Routes = () => {  


    return (
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/post/:id' component={Post} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/profile/:userid' component={UserProfile} />
            <Route path='/managePosts' component={PostManager} />
            <Route path='/newPost' component={NewPost} />
            <Route path='/editPost/:postid' component={NewPost} />
            <Route path='/manageCategories' component={CategoryManager} />
          </Switch>
    )
}

export default Routes