import Nav from './components/Nav';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { useEffect, useReducer } from 'react';
import { authenticateUser } from './services/auth.service'
import Routes from './Routes';
// import axios from 'axios';

// Export context for the user reducerhook
export const UserContext = React.createContext();

// Set up Reducer state and function
const initialState = {
  id: '',
  username: '',
  email: '',
  admin: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setUser':
      return {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        admin: action.payload.admin,
      }
    case 'logoutUser':
      return initialState

    default:
      return state

  }
}




function App() {
  // useReducer hook for the user
  const [currentUser, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('checking token again in app.js (1)')
    console.log(currentUser)
    // authenticateUser(setUser);

  }, [])

  // When a user selects a specific route, we can either use an outside source to store the posts data
  // or we can call for it from the db within the component... 
  return (
    <UserContext.Provider
      value={{ currentUser, userDispatch: dispatch }}
    >
      <Router>
        <div className='app'>
          <Nav />
          <Routes />
        </div>
      </Router>
    </UserContext.Provider>

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
1 - Add 'edit post' page functionality
2 - Add styling
3 - Add 'loading' functionality for various pages
4 - Add page for manageCategories

*/