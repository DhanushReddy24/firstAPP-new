import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useUser } from './UserContext';
import  ApiDataIOManager  from '../common/ApiDataIOManager';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user,setUser } = useUser();
  const utils = ApiDataIOManager();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const postDataToApi = async (url, formData) => {
    try {
      const response = await utils.postData(url,formData);
      const expirationTime = new Date().getTime() + 60*60*1000;
      localStorage.setItem('authTokens', JSON.stringify({ 
        expirationTime: expirationTime,
        access: response.data.access,
        refresh: response.data.refresh
       }));
      return response
    } catch (error) {
      console.error('Error posting data:', error);
      return { status: 'error', data: null };
    }
  };

  const fetchDataFromApi = async (url, setData) => {
    try {
      const response = await utils.fetchData(url);
      setData(response.data);
      localStorage.setItem('userData', JSON.stringify(response.data))
      return response
    } catch (error) {
      console.error('Error fetching data:', error);
      return { status: 'error', data: null };
    }
  };

  const postData = async () => {
    try {
      let url = 'user/token/'
      const token_response = await postDataToApi(url,{'username': username, 'password': password})

      url = 'user/details/'
      const user_response = await fetchDataFromApi(url,setUser)
      navigate('/tweet/')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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