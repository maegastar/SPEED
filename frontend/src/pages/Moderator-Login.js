import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Moderator_Login = () => {
    // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { user, pass } = document.forms[0];

    // Find user login info
    axios
      .post('http://localhost:5000/api/SPEED/Login', (document.forms[0]))
      .then(res => {
       if(res === "Login Successful"){
        setIsSubmitted(true);
       } else {
        setIsSubmitted(false);
       }
      })
      .catch(err => {
        console.log("API Error!");
      })
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div id="id01" className="modal">
      <div className = "container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Username </label><br></br>
              <input type="text" name="user" required />
              {renderErrorMessage("user")}
            </div>
            <div className="input-container">
              <label>Password </label><br></br>
              <input type="password" name="pass" required />
              {renderErrorMessage("pass")}
            </div>
            <div className="button-container">
              <button type="submit">Login</button>
            </div>
          </form>
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