import Home from './components/Home';
import Post from './components/Post';
import Nav from './components/Nav';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';
// import axios from 'axios';




function App() {

  const [currentUser, setCurrentUser] = useState({
    username: '',
    email: '',
    admin: false
  })

  const setNewUser = (user) => {
    setCurrentUser(user);
  };

  // When a user selects a specific route, we can either use an outside source to store the posts data
  // or we can call for it from the db within the component... 
  return (
    <Router>
      <Nav currentUser={currentUser}/>
      <div className='app'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/post/:id' component={Post} />
          <Route path='/login'
            render={() => (
              <Login setNewUser={setNewUser} />
            )} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </div>
    </Router>


  );
}

export default App;
