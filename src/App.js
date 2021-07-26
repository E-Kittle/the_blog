import Home from './components/Home';
import Post from './components/Post';
import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';




function App() {
  
  const [posts, setPosts] = useState([]);


  // Hook to grab the posts data from the API
  useEffect(() => {
    axios.get('https://pacific-citadel-88479.herokuapp.com/api/posts')
    .then(response => {
      console.log(response.data)
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
        </Switch>
      </div>
    </Router>


  );
}

export default App;
