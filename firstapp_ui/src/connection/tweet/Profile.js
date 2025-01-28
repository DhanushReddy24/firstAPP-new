import React from "react";
import Sidebar from "./Sidebar"; // Adjust the import path based on your folder structure

const ProfilePage = () => {
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
              <img
                alt=""
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="inline-block size-30 rounded-full ring-2 ring-white"
              />
              <div>
                <h1 className="text-lg font-semibold">Siddanth</h1>
                <p className="text-sm text-gray-500">@siddu_x</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
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
              <p className="text-xl font-bold">345</p>
            </div>
            <div>
              <h2 className="text-gray-600">Collections</h2>
              <p className="text-xl font-bold">43</p>
            </div>
            <div>
              <h2 className="text-gray-600">Likes</h2>
              <p className="text-xl font-bold">11.2k</p>
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
          <div className="bg-white shadow rounded-md overflow-hidden">
            <img
              src="https://wallpaperaccess.com/full/317501.jpg"
              alt="Photo 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-600">Dr. Nancy Huels</p>
            </div>
          </div>
          <div className="bg-white shadow rounded-md overflow-hidden">
            <img
              src="https://wallpaperaccess.com/full/1975274.jpg"
              alt="Photo 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-600">Gary Mueller</p>
            </div>
          </div>
          <div className="bg-white shadow rounded-md overflow-hidden">
            <img
              src="https://wallpaperaccess.com/full/144168.jpg"
              alt="Photo 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-600">Random User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
