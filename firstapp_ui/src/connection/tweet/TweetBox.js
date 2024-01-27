import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./TweetBox.css";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";



function TweetBox() {

  const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null})
  const [userData, setuserData] = useState(()=> localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {"id": null})
  const [formData, setFormData] = useState({'user':userData.id});
  const navigate = useNavigate();

  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "inherit", // Inherit color from parent
  };

  const onChange = e => (
      setFormData(prevFormData =>({ ...prevFormData, [e.target.name]: e.target.value }))
  );
  const uploadPicture = e => setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('send')
    try {
      console.log(formData)  
      let apiUrl = `http://127.0.0.1:8000/connection/tweet/`
      console.log(apiUrl)
      const response = await axios.post(apiUrl, formData,
        {
          'headers': { 
            'Content-Type':'multipart/form-data',
            'Authorization': 'JWT ' +String(authTokens.access) 
          },
        }
      )
      console.log(response.status);
      setFormData({ ...formData, ['tweet']: '',['image']: '', });
      
    }
    catch (error) {
      console.error('Error while posting data:', error);
    }
  };

  return (
  <div>
    <p>Send Post Data</p>

    <div className="tweetBox">
      <form onSubmit={handleSubmit}>
        <div className="tweetBox__input">
          <Avatar src="https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-1/c0.33.200.200a/p200x200/51099653_766820610355014_8315780769297465344_o.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=c1qBHkwAgVsAX8KynKU&_nc_ht=scontent-bom1-1.xx&oh=340b05bea693dd1671296e0c2d004bb3&oe=5F84CA62" />
          <input type="text" name="tweet" value={formData.tweet} placeholder="What's happening?" onChange={e => onChange(e)}/><br/>
        </div>
        
        <input type="file" name="image" accept="image/*" placeholder="Optional: select image" onChange={e => uploadPicture(e)} className="tweetBox__imageInput" ></input><br/>
        <div className='buttons'>
          <Button type="cancel" className='cancel__button' onClick={e => navigate('/tweet/')} >
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