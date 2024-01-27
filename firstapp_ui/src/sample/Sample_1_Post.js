import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Sample_1_Post() {

  const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null})
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    age: '',
    address: '',
    image:''
  });
  const { user_name, first_name, last_name, age, address, image } = formData;
  const apiDomain = process.env.REACT_APP_DJANGO_DOMAIN_NAME;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const uploadPicture = e => setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${apiDomain}/sample/sample_1/`,formData,
      {
        'headers': { 
          'Content-Type':'multipart/form-data',
          'Authorization': 'JWT ' +String(authTokens.access) 
        },
      }
    ).then(function (response) {
        console.log(response.status)
    })
    console.log(formData)
    //navigate('/sample_1');
  };

  return (
  <div>
    <p>Send Post Data</p>

    <form onSubmit={handleSubmit}>
      <label>User name</label>
      <input type="text" name="username" onChange={e => onChange(e)}/><br/>

      <label>First name</label>
      <input type="text" name="first_name" onChange={e => onChange(e)}/><br/>

      <label>Last name</label>
      <input type="text" name="last_name" onChange={e => onChange(e) }/><br/>
      
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