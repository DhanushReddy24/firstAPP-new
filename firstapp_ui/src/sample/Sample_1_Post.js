import React, { useState } from 'react';
import  ApiDataIOManager  from '../common/ApiDataIOManager';

function Sample_1_Post() {

  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    age: '',
    address: '',
    image:''
  });
  const utils = ApiDataIOManager();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const uploadPicture = e => setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  const postDataToApi = async (url, formData) => {
    try {
      const response = await utils.postData(url,formData);
      console.log(response.status)
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = 'sample/sample_1/'
    postDataToApi(url,formData)
  };

  return (
  <div>
    <p>Send Post Data</p>

    <form onSubmit={handleSubmit}>
      <label>User name</label>
      <input type="text" name="username" onChange={e => onChange(e)}/><br/>

      <label>First name</label>
      <input type="text" name="firstname" onChange={e => onChange(e)}/><br/>

      <label>Last name</label>
      <input type="text" name="lastname" onChange={e => onChange(e) }/><br/>
      
      <label>Age</label>
      <input type="text" name="age" onChange={e => onChange(e) }/><br/>

      <label>Address</label>
      <input type="text" name="address" onChange={e => onChange(e)} /><br/>

      <label for="image">Upload Image:</label>
      <input type="file" name="image" accept="image/*" onChange={e => uploadPicture(e)} ></input>

      <input type="submit" value="Send" />
    </form>

  </div>
  );
}
  
export default Sample_1_Post;