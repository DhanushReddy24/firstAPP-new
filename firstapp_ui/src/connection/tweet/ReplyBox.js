import React, { useState } from 'react';
import  ApiDataIOManager from '../../common/ApiDataIOManager';

function ReplyBox({tweetId, toggleRefresh}) {

  const [userData, setuserData] = useState(()=> localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {"id": null})
  const [formData, setFormData] = useState({'user': userData.id, 'tweet': tweetId});
  const utils = ApiDataIOManager();

  const onChange = e => (
      setFormData(prevFormData =>({ ...prevFormData, [e.target.name]: e.target.value }))
  );

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('send')
    try {
      console.log(formData)  
      let url = `connection/reply/${tweetId}/`
      const response = await utils.postData(url,formData);
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