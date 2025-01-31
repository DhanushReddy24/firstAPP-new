import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Search } from '@mui/icons-material';
import ApiDataIOManager from '../../../common/ApiDataIOManager';
import Sidebar from "../../../common/AppNav/Sidebar";

export default function Explore() {
  const [posts, setPosts] = useState([]);
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
      <div className="w-1/4 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <Box sx={{ width: '100%', padding: 2 }} className="overflow-auto">
        {/* Search Bar */}
        <div className="flex items-center mb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-2 top-2 text-gray-500" />
          </div>
        </div>

        {/* Grid Layout for Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => {
            const completePostImageUrl = `${post.image}`;
            return (
              <div key={post.id} className="w-full">
                {post.image && (
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={completePostImageUrl}
                      alt="post image"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Box>
    </div>
  );
}
