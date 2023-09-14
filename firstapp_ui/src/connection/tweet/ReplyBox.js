import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function ReplyBox({tweetId, toggleRefresh}) {

  const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null})
  const [userData, setuserData] = useState(()=> localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {"id": null})
  const [formData, setFormData] = useState({'user': userData.id, 'tweet': tweetId});
  const navigate = useNavigate();

  const onChange = e => (
      setFormData(prevFormData =>({ ...prevFormData, [e.target.name]: e.target.value }))
  );

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('send')
    try {
      console.log(formData)  
      let apiUrl = `http://127.0.0.1:8000/connection/reply/${tweetId}/`
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
      toggleRefresh();
      setFormData({ ...formData, ['reply']: '',});
      
    }
    catch (error) {
      console.error('Error while posting data:', error);
    }
  };

  return (
    <div className='replybox'>
      <form onSubmit={handleSubmit}>
        <label>Reply</label>
        <input type="text" name="reply" value={formData.reply} placeholder="Type reply...." onChange={e => onChange(e)}/>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
  
export default ReplyBox;