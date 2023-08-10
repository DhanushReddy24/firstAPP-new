import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import ReactDOM from "react-dom";
import FlipMove from "react-flip-move";
import Sample_1Post from "./Sample_1Post";
import Logout from '../authentication/Logout';

function Sample_1() {

  const [data, setdata] = useState([]); 
  const navigate = useNavigate();
  const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null}) 
  
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

  useEffect(() => {
    if (authTokens.access != null) {
      console.log('fetching data')
      ReactDOM.unstable_deferredUpdates(() => {
        fetchData(); 
      });
    }
    else{
      console.log(authTokens.access)
      console.log('redirect to login')
      navigate('/login/');
    }
  }, []);
  
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
      <a href="/login/">Login</a>

    </div>
  );
}

export default Sample_1;
