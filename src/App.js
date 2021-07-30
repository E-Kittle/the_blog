import Home from './components/Home';
import Post from './components/Post';
import Nav from './components/Nav';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { authenticateUser } from './services/auth.service'
// import axios from 'axios';



function App() {

// Two methods to accomplish grabbing the current user for for the nav element
// Either, just set the user when user login - problem is if user exits
// webpage and comes back, they're still logged in, but it looks like they're not

//Second solution is to make an API call to check the token
//problem will  be if this is called multiple times - Too many api calls


  const [currentUser, setCurrentUser] = useState({
    username: '',
    email: '',
    admin: false
  })

  // Sets the currentUser following the API call in useEffect hook
  const setUser = (user) => {
    setCurrentUser({
      username: user.username,
      email: user.email,
      admin: user.admin
    })
  };

  // Triggered when logout is selected in the nav element
  const logoutUser = () => {
    setCurrentUser({
      username: '',
      email: '',
      admin: false
    })
  }

  useEffect(() => {
    authenticateUser(setUser);
  }, [])

  // When a user selects a specific route, we can either use an outside source to store the posts data
  // or we can call for it from the db within the component... 
  return (
    <Router>
      <Nav logoutUser={logoutUser} currentUser={currentUser}/>
      <div className='app'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/post/:id' component={Post} />
          <Route path='/login' 
          render={(props) => (
            <Login {...props} setNewUser={setUser} />
          )} />
          
          <Route path='/signup' component={SignUp} />
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