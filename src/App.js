import Home from './components/Home';
import Post from './components/Post';
import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';



const comments = [
  {
      "name": "Guest",
      "_id": "60fb09208083fd16baa14981",
      "comment": "A harsh comment",
      "date": "2021-07-23T04:00:00.000Z",
      "post": "60fb091f8083fd16baa1496a",
      "__v": 0
  },
  {
      "name": "Guest",
      "_id": "60fb09208083fd16baa14975",
      "comment": "A harsh comment",
      "date": "2021-07-23T04:00:00.000Z",
      "post": "60fb091f8083fd16baa1496d",
      "__v": 0
  },
  {
      "name": "Guest",
      "_id": "60fb09208083fd16baa14977",
      "comment": "A nice comment",
      "date": "2021-07-23T04:00:00.000Z",
      "post": "60fb091f8083fd16baa1496d",
      "__v": 0
  }, {
      "name": "Guest",
      "_id": "60fb09208083fd16baa14979",
      "comment": "A harsh comment",
      "date": "2021-07-23T04:00:00.000Z",
      "post": "60fb091f8083fd16baa1496f",
      "__v": 0
  },
  {
      "name": "Guest",
      "_id": "60fb09208083fd16baa1497b",
      "comment": "A brutal comment",
      "date": "2021-07-23T04:00:00.000Z",
      "post": "60fb091f8083fd16baa1496f",
      "__v": 0
  }, {
      "name": "Guest",
      "_id": "60fb09208083fd16baa1497d",
      "comment": "A harsh comment",
      "date": "2021-07-23T04:00:00.000Z",
      "post": "60fb091f8083fd16baa14971",
      "__v": 0
  },
  {
      "name": "Guest",
      "_id": "60fb09208083fd16baa1497f",
      "comment": "A exhausted comment",
      "date": "2021-07-23T04:00:00.000Z",
      "post": "60fb091f8083fd16baa14971",
      "__v": 0
  }
];

const posts = [
  {
      "_id": "60fb091f8083fd16baa1496a",
      "title": "Post1",
      "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem maiores placeat accusamus hic odio deserunt nulla, ratione eius voluptates sit similique aut natus quod rem dignissimos obcaecati est! Quas, est? Error esse ipsum unde quia. Consequuntur deleniti veritatis, necessitatibus nihil officia iure? Delectus a porro consectetur totam ratione est id iure nisi sed rem soluta molestias, corporis hic molestiae earum eius suscipit praesentium expedita assumenda? Eos, distinctio incidunt. Natus illum quidem minus delectus qui molestiae quasi recusandae molestias ea vel.",
      "date": "2021-07-23T04:00:00.000Z",
      "published": true,
      "__v": 0
  },
  {
      "_id": "60fb091f8083fd16baa1496d",
      "title": "Post2",
      "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem maiores placeat accusamus hic odio deserunt nulla, ratione eius voluptates sit similique aut natus quod rem dignissimos obcaecati est! Quas, est? Error esse ipsum unde quia. Consequuntur deleniti veritatis, necessitatibus nihil officia iure? Delectus a porro consectetur totam ratione est id iure nisi sed rem soluta molestias, corporis hic molestiae earum eius suscipit praesentium expedita assumenda? Eos, distinctio incidunt. Natus illum quidem minus delectus qui molestiae quasi recusandae molestias ea vel.",
      "date": "2021-07-23T04:00:00.000Z",
      "published": false,
      "__v": 0
  },
  {
      "_id": "60fb091f8083fd16baa1496f",
      "title": "Post3",
      "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem maiores placeat accusamus hic odio deserunt nulla, ratione eius voluptates sit similique aut natus quod rem dignissimos obcaecati est! Quas, est? Error esse ipsum unde quia. Consequuntur deleniti veritatis, necessitatibus nihil officia iure? Delectus a porro consectetur totam ratione est id iure nisi sed rem soluta molestias, corporis hic molestiae earum eius suscipit praesentium expedita assumenda? Eos, distinctio incidunt. Natus illum quidem minus delectus qui molestiae quasi recusandae molestias ea vel.",
      "date": "2021-07-23T04:00:00.000Z",
      "published": true,
      "__v": 0
  },
  {
      "_id": "60fb091f8083fd16baa14971",
      "title": "Post4",
      "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem maiores placeat accusamus hic odio deserunt nulla, ratione eius voluptates sit similique aut natus quod rem dignissimos obcaecati est! Quas, est? Error esse ipsum unde quia. Consequuntur deleniti veritatis, necessitatibus nihil officia iure? Delectus a porro consectetur totam ratione est id iure nisi sed rem soluta molestias, corporis hic molestiae earum eius suscipit praesentium expedita assumenda? Eos, distinctio incidunt. Natus illum quidem minus delectus qui molestiae quasi recusandae molestias ea vel.",
      "date": "2021-07-23T04:00:00.000Z",
      "published": true,
      "__v": 0
  },
  {
      "_id": "60fb091f8083fd16baa14973",
      "title": "Post5",
      "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem maiores placeat accusamus hic odio deserunt nulla, ratione eius voluptates sit similique aut natus quod rem dignissimos obcaecati est! Quas, est? Error esse ipsum unde quia. Consequuntur deleniti veritatis, necessitatibus nihil officia iure? Delectus a porro consectetur totam ratione est id iure nisi sed rem soluta molestias, corporis hic molestiae earum eius suscipit praesentium expedita assumenda? Eos, distinctio incidunt. Natus illum quidem minus delectus qui molestiae quasi recusandae molestias ea vel.",
      "date": "2021-07-23T04:00:00.000Z",
      "published": true,
      "__v": 0
  }
];

fetch('https://pacific-citadel-88479.herokuapp.com/api/posts', {
  mode: 'cors'
}).then(function(response) {
  return response.json();
})
.then(function(response) {
  console.log(response);
})


function App() {

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
            <Post {...props} posts={posts} comments={comments}/>
          )} />
        </Switch>
      </div>
    </Router>


  );
}

export default App;
