import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Moderator = () => {

    const status = ""; //check for pending articles
    const [data, getData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])
 
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

            <div className='allTable'>

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