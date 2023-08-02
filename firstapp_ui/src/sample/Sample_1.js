import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sample_1Post from "./Sample_1Post";
import FlipMove from "react-flip-move";
import Logout from '../authentication/Logout';

function Sample_1() {

  const [data, setdata] = useState([]); 
  let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": "null", "access": "null"}) 
  
  const fetchData = async () => {
    try {
      console.log(authTokens.access)
      const response = await axios.get('http://127.0.0.1:8000/sample/sample_1/',{
        'headers': { 
          'Content-Type':'application/json',
          'Authorization': 'JWT ' +String(authTokens.access) 
        }
      });
      setdata(response.data);
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <h1>Hello Sample 1 react page</h1>
      <FlipMove>
        {data.map((row) => (
        <div key={row.id}>
          <Sample_1Post
            id={row.id}
            username={row.username}
            firstname={row.firstname}
            lastname={row.lastname}
            age={row.age}
            address={row.address}
            time={row.created_at}
          />
        </div>
        ))}
      </FlipMove>
      <a href="/sample_1_post/">Post</a>
      <Logout />

    </div>
  );
}

export default Sample_1;
