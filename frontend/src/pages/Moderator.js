import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Moderator = () => {

    const status = "Pending_Review"; //check for pending articles
    const [pendingData, getPendingData] = useState([])
    const [data, getData] = useState([])


    useEffect(() => {
        fetchPendingData()
        fetchData()
    }, [])
 
    //add params for pending status
    const fetchPendingData =() => { axios
    .get('https://speed-website.herokuapp.com/api/SPEED/', {
        params: {
            status
          }
    }).then((response) => {
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
            <h1>Articles Pending Review</h1>
            <div className='buttons'>
            <button>Submit</button>
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
                        <td>{item.published_date}</td>
                        <td>{item.publisher}</td>
                        <td>{item.email}</td>
                        <td><select id={i} onChange={onSelectChange.bind(this)}>
                            <option value="current">{item.status}</option>
                            <option value="Approved_By_Moderator">Approved By Moderator</option>
                            <option value="Rejected">Rejected</option>
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
                <button>All </button>
                <button>Accepted by Analyst</button>
                <button>Accepted by Moderator </button>
                <button>Rejected </button>
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
                        <td>{item.published_date}</td>
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

    return(
        <div>
            {renderForm}
        </div>
    );

}
 
export default Moderator;