import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const postData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/user/token/', {
        'username': username,
        'password': password
  
      });
      console.log('access token')
      console.log(response.data);
      localStorage.setItem('authTokens', JSON.stringify(response.data))
      navigate('/sample_1/')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    postData();
  };

  return (
  <div>
    <p>Hello User please login</p>

    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <input type="text" name="username" onChange={handleUsernameChange }/><br/>

      <label>Password</label>
      <input type="password" name="password" onChange={handlePasswordChange} /><br/>

      <input type="submit" value="Login" /><a href="/register/" class="ml-2">Register</a>
     <br /> <a href="/sample_1/" class="ml-2">Sample_1</a>
    </form>

  </div>
  );
}

export default Login;