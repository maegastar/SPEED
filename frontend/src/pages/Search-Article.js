import React from 'react';
import axios from 'axios';

const SearchArticle = () => {
    const handleSearch = async (event) => {
        event.preventDefault();

        var title = document.getElementById("title").value;
        var author = document.getElementById("author").value;
        var description = document.getElementById("description").value;
        var publishedDate = document.getElementById("publishedDate").value;
        var publisher = document.getElementById("publisher").value;

        const searchQuery = await axios
            .get('/api/SPEED/search', {
                params: {
                    title, author, description, publishedDate, publisher
                }
            }).then(response => showSearchResults(response))
            .catch(err => console.log("API error!"));
    };

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const showSearchResults = results => {
        let searchResultDiv = document.getElementById('searchResultDiv');

        // no results
        if (isJsonString(results)) {
            const resultsObj = JSON.parse(results)[0];
            const ol = document.createElement('ol');

            let li = document.createElement('li');

            for (const key in resultsObj) {
                if (resultsObj.hasOwnProperty(key)) {
                    let text = document.createTextNode(`${key} : ${resultsObj[key]}, `)
                    li.appendChild(text);
                }
            }
            ol.appendChild(li);
            searchResultDiv.appendChild(ol);
        } else {
            const h2 = document.createElement('h2');
            const content = document.createTextNode('No results found! Please search with different keywords!');
            h2.appendChild(content);

            searchResultDiv.appendChild(h2);
        }

    };

    const formToSearchArticle = (
        <div>
            <h2>Search Article</h2>
            <div className="container">
                <div className="form">
                    <form onSubmit={handleSearch}>
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
                            <input type="text" name="publishedDate" id="publishedDate" />
                        </div>
                        <div className="input-container">
                            <label>Publisher </label><br></br>
                            <input type="text" name="publisher" id="publisher" />
                        </div>
                        <div className="button-container">
                            <button type="submit">Submit</button>
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
            {/* <div>
        res.data {/* if count > 0 }
        ? <div>Results: </div>
        : <i>No article found!</i>
      </div> */}
        </div>
    );
};

export default SearchArticle;