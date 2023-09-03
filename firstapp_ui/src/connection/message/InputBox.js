import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import "./InputBox.css";
import axios from 'axios';

function InputBox({ selectedChat, toggleRefresh }) {

  const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null})
  const [userData, setuserData] = useState(()=> localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {"id": null})
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const onChange = e => (
    setFormData(prevFormData =>({ ...prevFormData, [e.target.name]: e.target.value }))
    );


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('send')
    try {
      console.log(formData)  
      let apiUrl = `http://127.0.0.1:8000/connection/message/${selectedChat}/`
      console.log(apiUrl)
      const response = await axios.post(apiUrl, formData,
        {
          'headers': { 
            'Content-Type':'application/json',
            'Authorization': 'JWT ' +String(authTokens.access) 
          },
        }
      )
      console.log(response.status);
      toggleRefresh();
      setFormData({ ...formData, ['message']: '' });
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    setFormData({ ...formData, ['user']: userData.id, ['opp_user']: selectedChat });
  }, [selectedChat]);

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Type your message..." name="message" value={formData.message} onChange={e => onChange(e)}/>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default InputBox;