import React, { useState } from 'react';
import axios from 'axios';

const Moderator_Login = () => {
    // React States
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    // Check if user info matches user data in database
    //currently set to only check if it matches the first user
    //user is "mod"
    //pass is "mod123"
    axios
      .get('https://speed-website.herokuapp.com/api/SPEED/mod')
      .then(res => {
       if(res.data[0].user === user){
        if(res.data[0].pass === pass){
          setIsSubmitted(true);
        } else {
          setIsSubmitted(false);
        console.log("IS submitted is false");
        }
       } else {
        setIsSubmitted(false);
        console.log("IS submitted is false");
       }
      })
      .catch(err => {
        console.log("API Error!");
      })
  };


  // JSX code for login form
  const renderForm = (
    <div>
      <h2>Moderator Login </h2>
    <div id="id01" className="modal">
      <div className = "container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Username </label><br></br>
              <input type="text" name="user" id="user" required />
            </div>
            <div className="input-container">
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
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
  );
}
 
export default Moderator_Login;