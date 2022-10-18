import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Route,
  Routes,
  NavLink,
  BrowserRouter as Router,
} from "react-router-dom";
const Home = () =>  {
    return (
      <div>
          <Routes>
            <Route path="/SubmitArticle"  />
            <Route path="/SearchArticle" />
          </Routes>
        <h2> Home Page</h2>
        <div className='content-container'>
          <div className='home-content'>
            <p>Speed is our website that let's any user search our book database. Our website also allows users to submit an article that is not listed on the database. Our idea for the website is for anyone to be able to access our portal to get information on books/articles.
             </p>
          </div>
          <div className='home-content'>
            <p>Once an article is subnmitted by a user, it then goes through a review process which is first reviewed by our moderators who check the validity of the article and Approve/Reject accordingly</p>
          </div>
          <div className='home-content'>
            <p>
Once approved/rejected by our moderator, our analysts do a final review and add the approved article to the database manually with all the details required or email the requester for rejected articles.</p>
          </div>
          <div className='home-content'>
            <p>Click on the links below or click on the Top Header of the page to start searching or submitting.</p>
          </div>
        </div>

          <ul className="header footer">
          <li><NavLink to="/SubmitArticle">Submit an Article</NavLink></li>
          <li><NavLink to="/SearchArticle">Search Articles</NavLink></li>
        </ul>
      </div>
    );
  }
 
export default Home;