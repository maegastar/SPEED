import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Moderator = () => {

    const [pendingData, getPendingData] = useState([])
    const [data, getData] = useState([])
    //status for filtering
    var stat = "";

    useEffect(() => {
        fetchPendingData()
        fetchAllData()
    }, [])
    
    const fetchPendingData =() => { axios
    .get('https://speed-website.herokuapp.com/api/SPEED/status',{
        params:{
            status:"pending"
        }
    }).then((response) => {
        console.log(response.data);
        getPendingData(response.data);
    })
    .catch(err => console.log("API error!"));
    }

    //handle status changes
    function onSelectChange(e){
        const submitUpdateStatus =() => {axios
            .put('https://speed-website.herokuapp.com/api/SPEED/updateStatus/'+e.target.id,{
                id:e.target.id,
                status:e.target.value
            }).then((response) => {
                console.log(response.data);
            })
            .catch(err => console.log("API error!"));
        }
            submitUpdateStatus();
            fetchAllData();
            fetchPendingData();
    }

    function filterALL(){
        fetchAllData();
    }

    function filterAnalyst(){
        stat = "analyst";
        fetchData();
    }

    function filterModerator(){
        stat = "moderator";
        fetchData();
    }

    function filterRejected(){
        stat = "rejected";
        fetchData();
    }

    //fetch by specific status
    const fetchData =() => { axios
    .get('https://speed-website.herokuapp.com/api/SPEED/status',{
        params:{
            status:stat
        }
    }).then((response) => {
        console.log(response.data);
        getData(response.data);
    })
    .catch(err => console.log("API error!"));
    }

    const fetchAllData =() => { axios
        .get('https://speed-website.herokuapp.com/api/SPEED/status').then((response) => {
            console.log(response.data);
            getData(response.data);
        })
        .catch(err => console.log("API error!"));
        }
             
    const renderForm = (
        <div>
            <div className='pendingTable'>
            <h1>Articles Pending Review</h1>
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
                        <td><select id={item._id} onChange={onSelectChange.bind(this)}>
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
                <button onClick={filterALL}>Show All</button>
                <button onClick={filterAnalyst}>Accepted by Analyst</button>
                <button onClick={filterModerator}>Accepted by Moderator </button>
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