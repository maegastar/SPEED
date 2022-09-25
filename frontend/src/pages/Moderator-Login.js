import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Moderator_Login = () => {
    // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
  ];

  const errors = {
    uname: "Invalid Username",
    pass: "Invalid Password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div id="id01" class="modal">
      <div className = "container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Username </label><br></br>
              <input type="text" name="uname" required />
              {renderErrorMessage("uname")}
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