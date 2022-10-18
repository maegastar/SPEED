import React from 'react';
import axios from 'axios';

const SearchArticle = () => {
  const handleSearch = async (event) => {
    event.preventDefault();

    var keywords = document.getElementById("keywords").value;
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var description = document.getElementById("description").value;
    var publishedDate = document.getElementById("publishedDate").value;
    var publisher = document.getElementById("publisher").value;

    const results = await axios
      .get('/api/SPEED/search', {
        params: {
          title, author, description, publishedDate, publisher
        }
      }).then(response => response)
      .catch(err => console.log("API error!"));
    showSearchResults(results.data);
  };

  const showSearchResults = results => {
    let searchResultDiv = document.getElementById('searchResultDiv');
    searchResultDiv.innerHTML = "";

    if (typeof results === 'object' && typeof results[0] === 'object') {
      const table = document.createElement('table');

      let headerRow = document.createElement('tr');
      let headings = ['Title', 'Author', 'Time', 'Journal'];

      headings.forEach(headingText => {
        let titleHeading = document.createElement('th');
        titleHeading.appendChild(document.createTextNode(headingText));
        headerRow.appendChild(titleHeading);
      });

      table.appendChild(headerRow);

      for (const i in results) {
        let tr = document.createElement('tr');
        for (const j in results[i]) {
          let td = document.createElement('td');
          if (j === '_id' || j === '__v' || j === 'status') continue;
          td.appendChild(document.createTextNode(`${results[i][j]}`));
          tr.appendChild(td);
        }
        table.appendChild(tr);
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
            <div className="button-container">
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
      </div>

      <div id="searchResultDiv"></div>
    </div>
  );

  return (
    <div>
      {formToSearchArticle}
    </div>
  );
};

export default SearchArticle;