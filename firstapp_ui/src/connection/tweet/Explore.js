import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import "./Explore.css";
import  ApiDataIOManager from '../../common/ApiDataIOManager';


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
    const apiDomain = process.env.REACT_APP_DJANGO_DOMAIN_NAME;
    const utils = ApiDataIOManager();
  
    const fetchData = async () => {
      try {
        let url = `connection/tweet/`;
        const response = await utils.fetchData(url);
        setPosts(response.data);
        console.log(response.data);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div className="feed_center">
    <Box sx={{ width: 500, minHeight: 393 }}>
      <Masonry columns={4} spacing={2}>

        {posts.map((post) => {
            console.log(post.image);
            const completePostImageUrl = `${post.image}`;
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
