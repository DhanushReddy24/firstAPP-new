import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, Link, useParams} from 'react-router-dom';
import FlipMove from "react-flip-move";
import Sample_1Post from "./Sample_1Post";
import Logout from '../authentication/Logout';
import { useUser } from '../authentication/UserContext';


function Sample_1() {

  const [data, setdata] = useState([]); 
  const navigate = useNavigate();
  const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null})
  const [userData, setuserData] = useState(()=> localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {"id": null})
  const { pk } = useParams(); 
  const { user } = useUser();
  const apiDomain = process.env.REACT_APP_DJANGO_DOMAIN_NAME;

  const fetchData = async (pk) => {
    try {
      let apiUrl = `${apiDomain}/sample/sample_1/`;
      if (pk) {
        apiUrl+=`${pk}`
      }
      console.log(apiUrl)
      console.log(authTokens.access)
      const response = await axios.get(apiUrl,{
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
    console.log('user')
    console.log(userData)
    if (authTokens.access != null) {
      console.log(pk)
      if (pk) {
        console.log('fetching data of '+`${pk}`)
        fetchData(pk);
      }
      else{
        console.log('fetching data')
        fetchData();
      }
    }
    else{
      console.log(authTokens.access)
      console.log('redirect to login')
      navigate('/login/');
    }
  }, [pk]);
  
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
            imageUrl={row.image}
          />
          <Link to={`/sample_1/${row.id}/`}>Go to Reply Component with PK {row.id}</Link>
        </div>
        ))}
      </FlipMove>
      <Link to="/sample_1_post/">Post</Link>
      <Logout />
      <Link to="/login/">Login</Link><br />
      <Link to="/sample_1/">Sample_1</Link>

    </div>
  );
}

export default Sample_1;
