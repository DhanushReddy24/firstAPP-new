import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sample_1Post from "./Sample_1Post";
import FlipMove from "react-flip-move";


function Sample_1() {

  const [data, setdata] = useState([]); 
  let [authTokens, setAuthTokens] = useState(
    {
      "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5MDk1MDA2NCwiaWF0IjoxNjkwODYzNjY0LCJqdGkiOiJmZDY3NDM1ZDMyMDA0ZjgwOWQ0NDFmNDk1ZjI0YjUwMCIsInVzZXJfaWQiOjJ9.cXmam8Oyewzy23JHt6i96lyA8SjCUehTE7rCx24sCcU",
      "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwODY3MjY0LCJpYXQiOjE2OTA4NjM2NjQsImp0aSI6IjZjODY1NDcxNDhkMDQ0ZTQ4ZjQzYzA3OWZhZDQyYjRkIiwidXNlcl9pZCI6Mn0.PEAlDQHMFkdprY-nVGx9JPi6b9PrFLkfYLPecTSIbmo"
    }
  );
  
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
      <a href="/sample_1_post/" className="ml-2">Post</a>
    </div>
  );
}

export default Sample_1;
