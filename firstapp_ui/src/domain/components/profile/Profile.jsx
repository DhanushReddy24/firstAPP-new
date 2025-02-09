import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiDataIOManager from '../../../common/ApiDataIOManager';

const ProfilePage = () => {
  const { userId: paramUserId } = useParams();
  const utils = ApiDataIOManager();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(() =>
    localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : { id: null }
  );
  const [posts, setPosts] = useState([]);
  const [profileData, setProfileData] = useState({});
  const userId = paramUserId || userData.id;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileUrl = `connection/profile/${userId}`;
        const profileResponse = await utils.fetchData(profileUrl);
        setProfileData(profileResponse.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const fetchPostData = async () => {
      try {
        const postsUrl = `connection/tweet/${userId}`;
        const postsResponse = await utils.fetchData(postsUrl);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error('Error fetching posts data:', error);
      }
    };

    fetchProfileData();
    fetchPostData();
  }, [userId, utils]);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const handlePhotoChange = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', event.target.files[0]);

    try {
      const url = `user/details/`;
      const response = await utils.putData(url, formData);
      if (response.status === 201) {
        setUserData((prev) => ({
          ...prev,
          image: response.data.image,
        }));
      }
    } catch (error) {
      console.error('Error while updating profile photo:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center overflow-hidden">
      <div className="w-full max-w-4xl">
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  alt="Profile"
                  src={profileData?.image || 'default-profile.png'}
                  className="inline-block rounded-full ring-2 ring-white w-20 h-20 object-cover"
                />
                <label
                  htmlFor="profilePhotoInput"
                  className="absolute bottom-0 right-0 bg-gray-500 text-white rounded-full p-1 cursor-pointer"
                >
                  📷
                </label>
                <input
                  id="profilePhotoInput"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold">
                  {profileData?.first_name} {profileData?.last_name}
                </h1>
                <p className="text-sm text-gray-500">
                  @{profileData?.username}
                </p>
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate(`/chat/${userId}`)}
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
              <p className="text-xl font-bold">{profileData.posts_count}</p>
            </div>
            <div>
              <h2 className="text-gray-600">Collections</h2>
              <p className="text-xl font-bold">43</p>
            </div>
            <div>
              <h2 className="text-gray-600">Likes</h2>
              <p className="text-xl font-bold">{profileData.likes_count}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex space-x-8 bg-white p-4 shadow rounded-md">
            <button className="text-blue-500 font-bold border-b-2 border-blue-500 pb-1">
              Photos
            </button>
            <button className="text-gray-600 hover:text-blue-500">
              Videos
            </button>
            <button className="text-gray-600 hover:text-blue-500">Likes</button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow rounded-md overflow-hidden"
            >
              <img
                src={post.image || 'default-post.png'}
                alt="Post"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-600">{post.tweet}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
