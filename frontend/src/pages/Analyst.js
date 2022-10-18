import React, { useState, useEffect } from 'react';
import axios from 'axios';


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
    }

    //handle status changes
    async function onStatusChange(e) {
        const status = e.target.value;
        const id = e.target.id;

        const update = await axios.get('/api/SPEED/changestatus', { params: { id, status } })
            .then((response) => {
                fetchApprovedByModerator();
                fetchAllData();
            })
            .catch(err => console.log(err));
        console.log(update);
    }

    function filterALL() { fetchAllData(); }
    function filterAnalyst() { fetchData("Approved_By_Analyst"); }
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

    const formatDate = (date) => {
        let dateObj = new Date(date);
        let month = (dateObj.getMonth() + 1).toString();
        let day = dateObj.getDate().toString();
        let year = dateObj.getFullYear();
        month = month.length < 2 ? '0' + month : month;
        day = day.length < 2 ? '0' + day : day;
        return [year, month, day].join('-');
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
                                    <td><select id={item._id} onChange={onStatusChange.bind(this)}>
                                        <option value="current">{item.status}</option>
                                        <option value="Approved_By_Analyst">Approve</option>
                                        <option value="Rejected">Reject</option>
                                    </select></td>
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
                    <button onClick={filterAnalyst}>Accepted by Analyst</button>
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

        </div>
    );

    return (<div>{renderForm}</div>);
}

export default Analyst;