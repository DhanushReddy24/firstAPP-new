import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from '../../../common/AppNav/Sidebar';
import ApiDataIOManager from '../../../common/ApiDataIOManager';

const ProfilePage = () => {
  let { userId } = useParams(); // Get userId from the URL parameters
  const utils = ApiDataIOManager();
  const [userData, setuserData] = useState(() =>
  localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : { id: null }
  ); 
  const [posts, setPosts] = useState([]);
  const [profiledata, setProfiledata] = useState([]);
  userId = userId || userData.id;


  const fetchPostData = async (userID) => {
    try {
      let url = `connection/tweet/${userId}`;
      const response = await utils.fetchData(url);
      let data = await response.data;
      setPosts(data);
      console.log(posts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);
  
  const fetchProfileData = async () => {
    try {
      let url = `connection/profile/${userId}`;
      const response = await utils.fetchData(url);
      let data = await response.data;
      setProfiledata(data);
      console.log(profiledata);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);
    
  const handlePhotoChange = async (event) => {
    event.preventDefault();
    //setFormData({ ...formData, [event.target.name]: event.target.files[0] });

    const formData = new FormData();
    formData.append("image", event.target.files[0]); 

    try {
      console.log('image',formData?.image);
      let url = `user/details/`;
      const response = await utils.putData(url, formData);
      console.log(response.status, formData.get("image"));
      if (response.status==201){
        setuserData((prev) => ({
          ...prev,
          image: response.data.image,
        }));
      }
      //event.target.reset();
      //setFormData({ ...formData, ['image']: null });
    } catch (error) {
      console.error('Error while posting data:', error);
    }
  };

  const navigate = useNavigate();

  return (

    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-3/4">
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  alt="Profile"
                  src={profiledata?.image}
                  className="inline-block size-30 rounded-full ring-2 ring-white w-20 h-20 object-cover"
                />
                <label
                  htmlFor="profilePhotoInput"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer"
                >
                  📷
                </label>
                <input
                  id="profilePhotoInput"
                  name = "image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold">{profiledata?.first_name} {profiledata?.last_name}</h1>
                <p className="text-sm text-gray-500">@{profiledata?.username}</p>
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate(`/chat/${userId}`)} // Correct placement of the function call
            >
              Message
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center bg-white p-4 shadow rounded-md">
            <div>
              <h2 className="text-gray-600">Followers</h2>
              <p className="text-xl font-bold">13.5k</p>
            </div>
            <div>
              <h2 className="text-gray-600">Posts</h2>
              <p className="text-xl font-bold">{profiledata.posts_count}</p>
            </div>
            <div>
              <h2 className="text-gray-600">Collections</h2>
              <p className="text-xl font-bold">43</p>
            </div>
            <div>
              <h2 className="text-gray-600">Likes</h2>
              <p className="text-xl font-bold">{profiledata.likes_count}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex space-x-8 bg-white p-4 shadow rounded-md">
            <button className="text-blue-500 font-bold border-b-2 border-blue-500 pb-1">
              Photos
            </button>
            <button className="text-gray-600 hover:text-blue-500">Videos</button>
            <button className="text-gray-600 hover:text-blue-500">Likes</button>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="container mx-auto px-4 py-6 grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="post-wrapper">
            <div className="bg-white shadow rounded-md overflow-hidden">
            <img
              src={post.image}
              alt="Photo 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-600">{post.tweet}</p>
            </div>
          </div>
          </div>
        ))}
        </div>
      </div>  
    </div>
  );
};

export default ProfilePage;
