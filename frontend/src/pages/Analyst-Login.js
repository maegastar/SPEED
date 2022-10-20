import React, { useState } from 'react';
import axios from 'axios';
import { rememberLogin } from '../Cookie';


const Analyst_Login = () => {
  // React States
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    const handleFailedLogin = () => {
      setIsSubmitted(false);
      alert("We couldn't log you in with those credentials. Please try again!");
      document.getElementById('user').value = "";
      document.getElementById('pass').value = "";
    }

    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    // Check if user info matches user data in database
    //currently set to only check if it matches the first user
    //user is "analyst"
    //pass is "analyst321"
    axios
      .get('https://speed-website.herokuapp.com/api/SPEED/mod')
      .then(res => {
        if (res.data[1].user === user && res.data[1].pass === pass) {
          setIsSubmitted(true)
          rememberLogin('analyst');
        } else {
          handleFailedLogin();
        }
      })
      .catch(err => {
        console.log("API Error!");
      })
  };


  // JSX code for login form
  const renderForm = (
    <div>
      <div id="id01" className="modal">
        <div className="container">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="input-container moderator-analyst">
                <label>Username </label><br></br>
                <input type="text" name="user" id="user" required />
              </div>
              <div className="input-container moderator-analyst">
                <label>Password </label><br></br>
                <input type="password" name="pass" id="pass" required />
              </div>
              <div className="button-container">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="login-form">
      {isSubmitted ? window.location = "/Analyst" : renderForm}
    </div>
  );
}

export default Analyst_Login;