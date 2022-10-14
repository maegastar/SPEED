import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Moderator = () => {

    const status = ""; //check for pending articles
    const [pendingData, getPendingData] = useState([])
    const [data, getData] = useState([])


    useEffect(() => {
        fetchPendingData()
        fetchData()
    }, [])
 
    //add params for pending status
    const fetchPendingData =() => { axios
    .get('https://speed-website.herokuapp.com/api/SPEED/').then((response) => {
        console.log(response.data);
        getPendingData(response.data);
    })
    .catch(err => console.log("API error!"));
    }

    //handle status change
    function onSelectChange(e){
        console.log(e.target.value);
        console.log(e.target.id)
    }
 
    const fetchData =() => { axios
    .get('https://speed-website.herokuapp.com/api/SPEED/').then((response) => {
        console.log(response.data);
        getData(response.data);
    })
    .catch(err => console.log("API error!"));
    }
             
    const renderForm = (
        <div>
            <div className='pendingTable'>
                <div className='container'>
                <table>
                    <thead>
                    <tr>
                        <th>Title </th>
                        <th>Author </th>
                        <th>Description </th>
                        <th>Published Date </th>
                        <th>Publisher </th>
                        <th>Status </th>
                    </tr>
                    </thead>
                    <tbody>
                    {pendingData.map((item, i) => (
                    <tr key={i}>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{item.description}</td>
                        <td>{item.published_date}</td>
                        <td>{item.publisher}</td>
                        <td><select id={i} onChange={onSelectChange.bind(this)}>
                            <option value="current">currentStatus</option>
                            <option value="pending">Pending</option>
                            <option value="review">Review</option>
                            <option value="reject">Reject</option>
                        </select></td>
                    </tr>
                ))}
                    </tbody>
                </table>
                </div>
                <button>Submit</button>
            </div>

            <div className='allTable'>
                <div className='buttons'>
                <button>All </button>
                <button>Accepted </button>
                <button>Reviewing </button>
                <button>Rejected </button>
                </div>
            <div className='container'>
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
                        <td>{item.published_date}</td>
                        <td>{item.publisher}</td>
                    </tr>
                ))}
                    </tbody>
                </table>
                </div>

            </div>

        </div>
    );

    return(
        <div>
            {renderForm}
        </div>
    );

}
 
export default Moderator;