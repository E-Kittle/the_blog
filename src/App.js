import Home from './components/Home';
import Post from './components/Post';
import Nav from './components/Nav';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { getAllPosts } from './services/user.service';


function App() {
  
  const [posts, setPosts] = useState([]);

  // The /posts fetch is called every single time that App renders
  // We need to fix this.

  // Hook to grab the posts data from the API - This is grabbed every single time the page reloads....
  useEffect(() => {
    getAllPosts()
    .then(response => {
      // console.log(response.data)
      setPosts(response.data);
    })
    .catch(error => console.log(error))
  }, []);


  // When a user selects a specific route, we can either use an outside source to store the posts data
  // or we can call for it from the db within the component... 
  return (
    <Router>
      <Nav />
      <div className='app'>
        <Switch>
          <Route path='/' exact render={(props) => (
            <Home {...props} posts={posts} />
          )} />
          <Route path='/post/:id' render={(props) => (
            <Post {...props} posts={posts} />
          )} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </div>
    </Router>


  );
}

export default App;
