import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: ''
  });
  const { username,first_name, last_name, email, password, re_password } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/user/auth/users/', {
        "username":username,
        "first_name":first_name, 
        "last_name" :last_name, 
        "email" :email, 
        "password":password, 
        "re_password":re_password

    }).then(function (response) {
        if (response.status == 200) {navigate('/login/');}
      })
  }

  return (
  <div>
    <p>Sign Up</p>

    <form onSubmit={handleSubmit}>
      <label>User name</label>
      <input type="text" name="first_name" onChange={e => onChange(e)}/><br/>

      <label>First name</label>
      <input type="text" name="first_name" onChange={e => onChange(e)}/><br/>

      <label>Last name</label>
      <input type="text" name="last_name" onChange={e => onChange(e) }/><br/>
      
      <label>Email</label>
      <input type="text" name="email" onChange={e => onChange(e) }/><br/>

      <label>Password</label>
      <input type="password" name="password" onChange={e => onChange(e)} /><br/>
      
      <label>Conform Password</label>
      <input type="password" name="re_password" onChange={e => onChange(e)} /><br/>

      <input type="submit" value="Sign Up" /><a href="/login/" class="ml-2">Login</a>
    </form>

  </div>
  );
}
  
  export default Register;