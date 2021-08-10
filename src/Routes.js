import React from 'react';
import Home from './components/Home';
import Post from './components/Post';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import PostManager from './components/PostManager';
import NewPost from './components/NewPost';
import { Switch, Route } from 'react-router-dom';


const Routes = (props) => {  

    const { setUser, currentUser } = props;

    return (
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
    )
}

export default Routes