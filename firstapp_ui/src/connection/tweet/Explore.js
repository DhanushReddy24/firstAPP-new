import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import './Explore.css';
import ApiDataIOManager from '../../common/ApiDataIOManager';
import Sidebar from "./Sidebar";

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
      let url = 'connection/tweet/'; // Ensure the correct URL
      const response = await utils.fetchData(url);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex">
    {/* Sidebar */}
    <div className="w-1/4 bg-white shadow">
      <Sidebar />
    </div>
      <Box sx={{ width: '100%', padding: 2 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
          {posts.map((post) => {
            const completePostImageUrl = `${post.image}`;
            return (
              <div key={post.id} className="post-wrapper">
                {post.image && (
                  <img
                    src={completePostImageUrl}
                    alt="post image"
                    className="explore-image"
                  />
                )}
              </div>
            );
          })}
        </Masonry>
      </Box>
    </div>
  );
}
