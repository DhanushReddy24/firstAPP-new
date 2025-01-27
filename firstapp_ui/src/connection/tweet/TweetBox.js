import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TweetBox.css';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import ApiDataIOManager from '../../common/ApiDataIOManager';

function TweetBox() {
  const [userData, setuserData] = useState(() =>
    localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : { id: null }
  );
  const [formData, setFormData] = useState({
    user: userData.id,
    tweet: '',
    image: null,
  });
  const navigate = useNavigate();
  const utils = ApiDataIOManager();

  const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'inherit', // Inherit color from parent
  };

  const onChange = (e) =>
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  const uploadPicture = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      let url = `connection/tweet/`;
      const response = await utils.postData(url, formData);
      console.log(response.status);
      event.target.reset();
      setFormData({ ...formData, ['tweet']: '', ['image']: null });
    } catch (error) {
      console.error('Error while posting data:', error);
    }
  };

  return (
    <div>
      <p>Send Post Data</p>

      <div className="tweetBox">
        <form onSubmit={handleSubmit}>
          <div className="tweetBox__input">
            <Avatar src={`${userData.image}`} />
            <input
              type="text"
              name="tweet"
              value={formData.tweet}
              placeholder="What's happening?"
              onChange={(e) => onChange(e)}
            />
            <br />
          </div>

          <input
            type="file"
            name="image"
            accept="image/*"
            placeholder="Optional: select image"
            onChange={(e) => uploadPicture(e)}
            className="tweetBox__imageInput"
          ></input>
          <br />
          <div className="buttons">
            <Button
              type="cancel"
              className="cancel__button"
              onClick={(e) => navigate('/tweet/')}
            >
              Cancel
            </Button>

            <Button type="submit" className="tweetBox__button">
              Tweet
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
