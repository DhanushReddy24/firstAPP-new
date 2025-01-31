import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import ApiDataIOManager from '../common/ApiDataIOManager';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CLIENT_ID = '95906387495-no134p459qjt0ct2fie4iq7bi2dse79u.apps.googleusercontent.com';

// gapi.load('auth2', () => {
//   gapi.auth2.init({
//     client_id: CLIENT_ID,
//   });
// });

function Login() {
  const [username, setUsername] = useState('');
  const [values, setValues] = useState({ password: '', showPassword: false });
  const navigate = useNavigate();
  const { setUser } = useUser();
  const utils = ApiDataIOManager();

  const postDataToApi = async (url, formData) => {
    try {
      const response = await utils.postData(url, formData);
      localStorage.setItem(
        'authTokens',
        JSON.stringify({
          expirationTime: new Date().getTime() + 60 * 60 * 1000,
          access: response.data.access,
          refresh: response.data.refresh,
        })
      );
      return response;
    } catch (error) {
      console.error('Error posting data:', error);
      return { status: 'error', data: null };
    }
  };

  const fetchDataFromApi = async (url) => {
    try {
      const response = await utils.fetchData(url);
      setUser(response.data);
      localStorage.setItem('userData', JSON.stringify(response.data));
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      return { status: 'error', data: null };
    }
  };

  const postData = async () => {
    try {
      const token_response = await postDataToApi('user/token/', {
        username,
        password: values.password,
      });
      await fetchDataFromApi('user/details/');
      navigate('/tweet/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postData();
  };

  const handleGoogleSuccess = (response) => {
    console.log('Google Sign-In Success:', response);
    const token = response.credential;
    localStorage.setItem('googleToken', token);
    navigate('/tweet/');
  };

  const handleGoogleFailure = () => {
    console.error('Google Sign-In Failed');
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
            />
          </div>
       
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <input
                type={values.showPassword ? 'text' : 'password'}
                name="password"
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 pr-10"
              />
              <span className="absolute inset-y-0 right-3 flex items-center">
                <IconButton onClick={() => setValues({ ...values, showPassword: !values.showPassword })}>
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </span>
            </div>
          </div>

          <div className="text-right text-sm">
            <a href="#" className="text-indigo-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
          </GoogleOAuthProvider>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member? <a href="/register/" className="text-indigo-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
