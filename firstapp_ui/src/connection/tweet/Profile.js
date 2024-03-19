// profile.js

import React from 'react';
import './Profile.css';

const Profile = () => {
  // Sample bio data
  const userData = {
    name: 'John Doe',
    age: 30,
    occupation: 'Software Engineer',
    location: 'New York, USA',
    bio: 'Passionate about technology and innovation. Enjoys coding, hiking, and playing guitar.',
  };

  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src="/path/to/profile_image.jpg" alt="Profile" />
      </div>
      <div className="profile-details">
        <h2>{userData.name}</h2>
        <p><strong>Age:</strong> {userData.age}</p>
        <p><strong>Occupation:</strong> {userData.occupation}</p>
        <p><strong>Location:</strong> {userData.location}</p>
        <p><strong>Bio:</strong> {userData.bio}</p>
      </div>
      <div className="profile-components">
        {/* Additional JavaScript components can be added here */}
        <h3>Additional Components</h3>
        {/* Sample components */}
        <div className="sample-component">
          <p>This is a sample component</p>
        </div>
        <div className="sample-component">
          <p>This is another sample component</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
