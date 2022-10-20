import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../Helper';

const Analyst = () => {

    const [pendingData, getPendingData] = useState([])
    const [data, getData] = useState([])
    var stat = "";


    useEffect(() => {
        fetchApprovedByModerator()
        fetchAllData()
    }, [])


    const fetchApprovedByModerator = () => {
        axios
            .get('/api/SPEED/status', {
                params: {
                    status: "Approved_By_Moderator"
                }
            }).then((response) => {
                getPendingData(response.data);
            })
            .catch(err => console.log(err));
        document.getElementById("header").style.visibility = 'hidden';
    }

    async function handleEditFormSubmit(e) {
        e.preventDefault();

        const id = document.getElementById('hiddenId').value;
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const published_date = document.getElementById('published_date').value;
        const publisher = document.getElementById('publisher').value;
        const description = document.getElementById('description').value;

        const update = await axios.get('/api/SPEED/publish', { params: { id, title, author, published_date, publisher, description } })
            .then((response) => {
                alert(`Article "${title}" Published Successfully!`)
                window.location.reload(true);
            }).catch(err => console.log(err));
        console.log(update);
    }

    const refreshEditForm = (item) => {
        setTimeout(function () {
            document.getElementById('hiddenId').value = item._id ?? '';
            document.getElementById('title').value = item.title ?? '';
            document.getElementById('author').value = item.author ?? '';
            document.getElementById('published_date').value = item.published_date ? formatDate(item.published_date) : '';
            document.getElementById('publisher').value = item.publisher ?? '';
            document.getElementById('description').value = item.description ?? '';
        }, 50);
    }

    const EditForm = () => {
        return (
            <div>
                < a href="#" id="closeModal" >&times;</a >
                <h3>Article Details</h3>
                <form onSubmit={handleEditFormSubmit}>
                    <input type="hidden" name="id" id="hiddenId" />
                    <div class="input-container">
                        <label for="title">Title</label>
                        <input type="text" name="title" id="title" />
                    </div>
                    <div class="input-container">
                        <label for="author">Author</label>
                        <input type="text" name="author" id="author" />
                    </div>
                    <div class="input-container">
                        <label for="published_date">Published Date</label>
                        <input type="date" name="published_date" id="published_date" />
                    </div>
                    <div class="input-container">
                        <label for="publisher">Publisher</label>
                        <input type="text" name="publisher" id="publisher" />
                    </div>
                    <div class="input-container">
                        <label for="description">Description</label>
                        <input type="text" name="description" id="description" />
                    </div>
                    <button type="submit"> Publish </button>
                </form>
            </div >
        );
    }

    function filterALL() { fetchAllData(); }
    function filterAnalyst() { fetchData("PUBLISHED"); }
    function filterModerator() { fetchData("Approved_By_Moderator"); }
    function filterRejected() { fetchData("Rejected"); }

    const fetchData = (status) => {
        axios
            .get('/api/SPEED/status', {
                params: { status }
            }).then((response) => {
                getData(response.data);
            })
            .catch(err => console.log("API error!"));
    }

    const fetchAllData = () => {
        axios
            .get('/api/SPEED/status').then((response) => {
                getData(response.data);
            })
            .catch(err => console.log("API error!"));
    }

    const renderForm = (
        <div>
            <div className='pendingTable'>
                <h1>Articles APPROVED by Moderator</h1>
                <div className='containerTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>Title </th>
                                <th>Author </th>
                                <th>Description </th>
                                <th>Published Date </th>
                                <th>Publisher </th>
                                <th>Email</th>
                                <th>Status </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingData.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.description}</td>
                                    <td>{formatDate(item.published_date)}</td>
                                    <td>{item.publisher}</td>
                                    <td>{item.email}</td>
                                    <td><button><a class="view-modal-link" onClick={refreshEditForm(item)} href="#detailModal">Edit</a></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            <div className='allTable'>
                <h1>Articles Database</h1>
                <div className='buttons'>
                    <button onClick={filterALL}>Show All</button>
                    <button onClick={filterModerator}>Accepted by Moderator </button>
                    <button onClick={filterAnalyst}>Published by Analyst</button>
                    <button onClick={filterRejected}>Rejected </button>
                </div>
                <div className='containerTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>Title </th>
                                <th>Author </th>
                                <th>Description </th>
                                <th>Published Date </th>
                                <th>Publisher </th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.description}</td>
                                    <td>{formatDate(item.published_date)}</td>
                                    <td>{item.publisher}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            <div id="detailModal">
                <div id="modalBody">
                    <EditForm />
                </div>
            </div>
        </div>
    );


    return (<div>{renderForm}</div>);
}

export default Analyst;