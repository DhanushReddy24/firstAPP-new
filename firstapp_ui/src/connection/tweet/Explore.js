import React, { useState, useEffect } from "react";
import axios from 'axios';
// import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import {useNavigate} from 'react-router-dom';
import "./Explore.css";



const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Explore() {
    const [posts, setPosts] = useState([]);
    const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null})
    const navigate = useNavigate();
    const apiDomain = process.env.REACT_APP_DJANGO_DOMAIN_NAME;
  
    const fetchData = async () => {
      try {
        let apiUrl = `${apiDomain}/connection/tweet/`;
  
        console.log(apiUrl)
        console.log(authTokens.access)
        const response = await axios.get(apiUrl,{
          'headers': { 
            'Content-Type':'application/json',
            'Authorization': 'JWT ' +String(authTokens.access) 
          }
        });
        setPosts(response.data);
        console.log(response.data);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      if (authTokens.access != null) {
        console.log('fetching data')
        fetchData();
      }
      else{
        console.log('redirect to login')
        navigate('/login/');
      }
    }, []);

  return (
    <div className="feed_center">
    <Box sx={{ width: 500, minHeight: 393 }}>
      <Masonry columns={4} spacing={2}>

        {posts.map((post) => {
            console.log(post.image);
            const completePostImageUrl = `${apiDomain}${post.image}`;
            return (
            <div key={post.id} className="post-wrapper">
              {post.image!==null && <img src={completePostImageUrl} alt="post image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> }
            </div>
            )    
        })}
      </Masonry>
    </Box>
    </div>
  );
}
