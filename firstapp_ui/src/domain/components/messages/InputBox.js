import React, { useState, useEffect } from 'react';
import './InputBox.css';
import SendIcon from '@mui/icons-material/Send';
import MoodIcon from '@mui/icons-material/Mood';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ApiDataIOManager from '../../../common/ApiDataIOManager';

function InputBox({ selectedChat, toggleRefresh }) {
  const [userData, setuserData] = useState(() =>
    localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : { id: null }
  );
  const [formData, setFormData] = useState({});
  const utils = ApiDataIOManager();

  const onChange = (e) =>
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      let url = `connection/message/${selectedChat.id}/`;
      const response = await utils.postData(url, formData);
      console.log(response.status);
      toggleRefresh();
      setFormData({ ...formData, ['message']: '' });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    setFormData({
      ...formData,
      ['user']: userData.id,
      ['opp_user']: selectedChat.id,
    });
  }, [selectedChat]);

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-container-items">
          <MoodIcon fontSize="large" className="moodicon" />
          <AddPhotoAlternateIcon fontSize="large" className="addicon" />
          <input
            type="text"
            placeholder="Type your message..."
            name="message"
            value={formData.message}
            onChange={(e) => onChange(e)}
            className="input-field"
          />

          <span onClick={handleSubmit}>
            <SendIcon fontSize="large" className="sendicon" />
          </span>
        </div>
      </form>
    </div>
  );
}

export default InputBox;
