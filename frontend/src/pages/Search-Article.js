import React from 'react';
import axios from 'axios';
import { formatDate } from '../Helper';

const SearchArticle = () => {
  const handleSearch = async (event) => {
    event.preventDefault();

    var keywords = document.getElementById("keywords").value;
    // var title = document.getElementById("title").value;
    // var author = document.getElementById("author").value;
    // var description = document.getElementById("description").value;
    // var publishedDate = document.getElementById("publishedDate").value;
    // var publisher = document.getElementById("publisher").value;

    const results = await axios
      .get('/api/SPEED/search', {
        params: {
          keywords,
          // title, author, description, publishedDate, publisher

        }
      }).then(response => response)
      .catch(err => console.log("API error!"));
    showSearchResults(results.data);
  };

  const loadReviews = async (id) => {
    const reviews = await axios
      .get('api/SPEED/getReviews', { params: { id } })
      .then(response => response.data)
      .catch(err => console.log("Error: " + err));

    const reviewsContainer = document.getElementById('reviewsContainer');
    let reviewsHTML = `<input type="hidden" id="articleId" value="${id}"/>`;
    reviews.forEach((review) => {
      reviewsHTML +=
        `<div class="review">` +
        `  <p class="reviewer-email"><strong>${review.email}</strong> : ${review.review}</p>` +
        `</div>`;
    })
    reviewsContainer.innerHTML = reviewsHTML;
  }

  const refreshDetailModal = async (id) => {
    const item = await axios
      .get('api/SPEED/getById', {
        params: { id }
      }).then(response => response.data)
      .catch(err => console.log("Error: " + err));

    document.getElementById('titleText').textContent = item.title ?? '';
    document.getElementById('authorText').textContent = item.author ?? '';
    document.getElementById('publishedDateText').textContent = item.published_date ? formatDate(item.published_date) : '';
    document.getElementById('publisherText').textContent = item.publisher ?? '';
    document.getElementById('descriptionText').textContent = item.description ?? '';

    loadReviews(id);
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const article_id = document.getElementById('articleId').value;
    const review = document.getElementById('reviewInput').value;
    const email = document.getElementById('emailInput').value;

    const result = await axios.get('/api/SPEED/submitReview', { params: { article_id, review, email } })
      .then(response => response)
      .catch(err => console.log("Error: " + err));
    console.log(result);
    alert("Thank you for leaving a review!");
    document.getElementById('reviewInput').value = "";
    document.getElementById('emailInput').value = "";
    loadReviews(article_id);
  }

  const ReviewForm = () => {
    return (
      <>
        <form onSubmit={handleReviewSubmit}>
          <p><strong>Leave a review</strong></p>

          <input type="text" name="review" id="reviewInput" placeholder='your review...' />
          <br />
          <input type="text" name="email" id="emailInput" placeholder="email@xyz.com" />

          <button id="reviewSubmitBtn" type='submit'>Submit</button>
        </form>
      </>
    );
  }

  const ModalBody = () => {
    return (
      <>
        <a href="#" id="closeModal">&times;</a>
        <h3>Article Detail</h3>
        <p><strong>Title:</strong> <span id="titleText"></span></p>
        <p><strong>Author:</strong> <span id="authorText"></span></p>
        <p><strong>Published Date:</strong> <span id="publishedDateText"></span></p>
        <p><strong>Publisher:</strong> <span id="publisherText"></span></p>
        <p><strong>Description:</strong><br /> <span id="descriptionText"></span></p>
        <hr />
        <h3>Reviews</h3>
        <hr />
        <div id="reviewsContainer"></div>
        <hr />
        <ReviewForm />
      </>
    );
  }

  const showSearchResults = results => {
    let searchResultDiv = document.getElementById('searchResultDiv');
    searchResultDiv.innerHTML = "";

    if (typeof results === 'object' && typeof results[0] === 'object') {
      const table = document.createElement('table');

      let headerRow = document.createElement('tr');
      let headings = ['Title', 'Author', 'Time', 'Journal', 'View Detail'];

      headings.forEach(headingText => {
        let titleHeading = document.createElement('th');
        titleHeading.appendChild(document.createTextNode(headingText));
        headerRow.appendChild(titleHeading);
      });

      table.appendChild(headerRow);

      for (const i in results) {
        results.map((item, i) => {
          let tr = document.createElement('tr');

          const insertCell = (value) => {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(value));
            tr.appendChild(td);
          };

          insertCell(item.title);
          insertCell(item.author);
          insertCell(formatDate(item.published_date));
          insertCell(item.publisher);

          let buttonTd = document.createElement('td');
          let button = document.createElement('button');
          let link = document.createElement('a');
          link.setAttribute('href', '#detailModal');
          link.textContent = "View"
          link.className = "view-modal-link";
          link.onclick = function () {
            refreshDetailModal(item._id);
          };
          button.appendChild(link);
          buttonTd.appendChild(button);
          tr.appendChild(buttonTd);

          table.appendChild(tr);
        })
      }

      searchResultDiv.appendChild(table);
    } else { // no results
      const h2 = document.createElement('h2');
      const content = document.createTextNode('No results found! Please search with different keywords!');
      h2.appendChild(content);

      searchResultDiv.appendChild(h2);
    }

  };

  const formToSearchArticle = (
    <div className="search-submit-container">
      <div className="container">
        <div className="form">
          <form onSubmit={handleSearch}>
            <div className="input-container">
              <label>Keywords </label><br></br>
              <input type="text" name="keywords" id="keywords" required />
            </div>
            {/*  
            <div className="input-container">
              <label>Title </label><br></br>
              <input type="text" name="title" id="title" />
            </div>
            <div className="input-container">
              <label>Author </label><br></br>
              <input type="text" name="author" id="author" />
            </div>
            <div className="input-container">
              <label>Description </label><br></br>
              <input type="text" name="description" id="description" />
            </div>
            <div className="input-container">
              <label>Published Date </label><br></br>
              <input type="date" name="publishedDate" id="publishedDate" />
            </div>
            <div className="input-container">
              <label>Publisher </label><br></br>
              <input type="text" name="publisher" id="publisher" />
            </div>
            */}
            <div className="button-container">
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
      </div>

      <div id="searchResultDiv">
      </div>
      <div id="detailModal">
        <div id="modalBody">
          <ModalBody />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {formToSearchArticle}
    </div>
  );
};

export default SearchArticle;