import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Sample_1_Post() {
  const [formData, setFormData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    age: '',
    address: ''
  });
  const { user_name, first_name, last_name, age, address } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/sample/sample_1/', {
        "username":user_name, 
        "firstname":first_name, 
        "lastname" :last_name, 
        "age" :age, 
        "address":address

    }).then(function (response) {
        console.log(response.status)
    })
    navigate('/sample_1');
  };

  return (
  <div>
    <p>Send Post Data</p>

    <form onSubmit={handleSubmit}>
      <label>User name</label>
      <input type="text" name="user_name" onChange={e => onChange(e)}/><br/>

      <label>First name</label>
      <input type="text" name="first_name" onChange={e => onChange(e)}/><br/>

      <label>Last name</label>
      <input type="text" name="last_name" onChange={e => onChange(e) }/><br/>
      
      <label>Age</label>
      <input type="text" name="age" onChange={e => onChange(e) }/><br/>

      <label>Address</label>
      <input type="text" name="address" onChange={e => onChange(e)} /><br/>

      <input type="submit" value="Send" />
    </form>

  </div>
  );
}
  
  export default Sample_1_Post;