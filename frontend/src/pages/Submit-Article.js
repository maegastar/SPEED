import React, { useState } from 'react';
import axios from 'axios';

const SubmitArticle = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmissionOfArticle = async (event) => {
    event.preventDefault();

    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var description = document.getElementById("description").value;
    var publishedDate = document.getElementById("publishedDate").value;
    var publisher = document.getElementById("publisher").value;

    const query = await axios
      .post('/api/SPEED/submit', {
        title, author, description, publishedDate, publisher
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(response => { return response; })
      .catch(err => console.log("API error!"));
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
              <input type="date" name="publishedDate" id="publishedDate" required />
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