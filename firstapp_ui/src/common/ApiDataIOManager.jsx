import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ApiDataIOManager() {
  const apiDomain = process.env.REACT_APP_DJANGO_DOMAIN_NAME;
  const navigate = useNavigate();

  const getAuthTokens = () => {
    const authTokens = localStorage.getItem('authTokens');
    return authTokens ? JSON.parse(authTokens) : { refresh: null, access: null, expirationTime: null };
  };

  const isTokenValid = (authTokens) => {
    return authTokens.access != null && new Date().getTime() < authTokens.expirationTime;
  };

  const handleAuthError = () => {
    localStorage.removeItem('authTokens');
    console.log('redirect to login');
    navigate('/login/');
  };

  const fetchData = async (url) => {
    try {
      const authTokens = getAuthTokens();
      if (isTokenValid(authTokens)) {
        console.log('Fetching data');
        const apiUrl = `${apiDomain}/${url}`;
        console.log(apiUrl);
        const response = await axios.get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${authTokens.access}`,
          },
        });
        console.log(response.data);
        console.log('returning data');
        return response;
      } else {
        handleAuthError();
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
      return { status: 'error', data: null };
    }
  };

  const postData = async (url, data) => {
    try {
      const authTokens = getAuthTokens();
      if (isTokenValid(authTokens) || url === 'user/token/' || url === 'user/auth/users/') {
        console.log('Posting data');
        const apiUrl = `${apiDomain}/${url}`;
        console.log(apiUrl);
        const headers = url === 'user/token/' || url === 'user/auth/users/' ? {} : {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${authTokens.access}`,
        };
        const post_response = await axios.post(apiUrl, data, { headers });
        console.log('Post Status: ', post_response.status);
        return post_response;
      } else {
        handleAuthError();
      }
    } catch (error) {
      console.error('Error while posting data:', error);
      return { status: 'error', data: null };
    }
  };

  const putData = async (url, data) => {
    try {
      const authTokens = getAuthTokens();
      if (isTokenValid(authTokens)) {
        console.log('Updating data');
        const apiUrl = `${apiDomain}/${url}`;
        console.log(apiUrl);
        const put_response = await axios.put(apiUrl, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `JWT ${authTokens.access}`,
          },
        });
        console.log('Put Status: ', put_response.status);
        return put_response;
      } else {
        handleAuthError();
      }
    } catch (error) {
      console.error('Error while updating data:', error);
      return { status: 'error', data: null };
    }
  };

  return {
    fetchData,
    postData,
    putData,
  };
}

export default ApiDataIOManager;