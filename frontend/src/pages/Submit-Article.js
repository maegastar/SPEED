import React, { useState } from 'react';
import axios from 'axios';

const SubmitArticle = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmissionOfArticle = async (event) => {
    event.preventDefault();

    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var description = document.getElementById("description").value;
    var published_date = document.getElementById("published_date").value;
    var publisher = document.getElementById("publisher").value;

    const form = document.querySelector('form');

    if (!form) return;

    const formData = new FormData(form);

    // let isSuccessful = false;
    const response = await axios
      .get('/api/SPEED/submit', {
        params: {
          title, author, description, published_date, publisher
        }
      })
      .then(response => response)
      .catch(err => console.log("API error!"));

    if (response.data.isSuccessful) alert("Article added successfully!");
  };

  const formToSubmitArticle = (
    <div>
      <h2>Submit Article</h2>
      <div className="container">
        <div className="form">
          <form onSubmit={handleSubmissionOfArticle}>
            <div className="input-container">
              <label>Title </label><br></br>
              <input type="text" name="title" id="title" required />
            </div>
            <div className="input-container">
              <label>Author </label><br></br>
              <input type="text" name="author" id="author" required />
            </div>
            <div className="input-container">
              <label>Description </label><br></br>
              <input type="text" name="description" id="description" required />
            </div>
            <div className="input-container">
              <label>Published Date </label><br></br>
              <input type="date" name="published_date" id="published_date" required />
            </div>
            <div className="input-container">
              <label>Publisher </label><br></br>
              <input type="text" name="publisher" id="publisher" required />
            </div>
            <div className="button-container">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {formToSubmitArticle}
      {/* <p>isSubmitted ? <i>Article Submitted Successfully</i> : <i></i></p> */}
    </div>
  );
};

export default SubmitArticle;