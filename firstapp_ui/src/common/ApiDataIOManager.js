import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ApiDataIOManager() {
  const apiDomain = process.env.REACT_APP_DJANGO_DOMAIN_NAME;
  const navigate = useNavigate();

  const fetchData = async (url) => {
    try {
      const authTokens = localStorage.getItem('authTokens')
        ? JSON.parse(localStorage.getItem('authTokens'))
        : { refresh: null, access: null, expirationTime: null };
      if (
        authTokens.access != null &&
        new Date().getTime() < authTokens.expirationTime
      ) {
        console.log('Fetching data');
        let apiUrl = `${apiDomain}/${url}`;
        console.log(apiUrl);
        const response = await axios.get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + String(authTokens.access),
          },
        });
        console.log(response.data);
        console.log('returing data');
        return response;
      } else {
        localStorage.removeItem('authTokens');
        console.log('redirect to login');
        navigate('/login/');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
      return { status: 'error', data: null };
    }
  };

  const postData = async (url, data) => {
    try {
      const authTokens = localStorage.getItem('authTokens')
        ? JSON.parse(localStorage.getItem('authTokens'))
        : { refresh: null, access: null, expirationTime: null };
      if (
        authTokens.access != null &&
        new Date().getTime() < authTokens.expirationTime
      ) {
        console.log('Posting data');
        let apiUrl = `${apiDomain}/${url}`;
        console.log(apiUrl);
        const post_response = await axios.post(apiUrl, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'JWT ' + String(authTokens.access),
          },
        });
        console.log('Post Status: ', post_response.status);
        return post_response;
      } else if (url == 'user/token/' || url == 'user/auth/users/') {
        console.log('Posting data');
        let apiUrl = `${apiDomain}/${url}`;
        console.log(apiUrl);
        const post_response = await axios.post(apiUrl, data);
        console.log('Post Status: ', post_response.status);
        return post_response;
      } else {
        localStorage.removeItem('authTokens');
        console.log('redirect to login');
        navigate('/login/');
      }
    } catch (error) {
      console.error('Error while posting data:', error);
      return { status: 'error', data: null };
    }
  };

  const putData = async (url, data) => {
    try {
      const authTokens = localStorage.getItem('authTokens')
        ? JSON.parse(localStorage.getItem('authTokens'))
        : { refresh: null, access: null, expirationTime: null };
      if (
        authTokens.access != null &&
        new Date().getTime() < authTokens.expirationTime
      ) {
        console.log('Updating data');
        let apiUrl = `${apiDomain}/${url}`;
        console.log(apiUrl);
        const put_response = await axios.put(apiUrl, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'JWT ' + String(authTokens.access),
          },
        });
        console.log('Put Status: ', put_response.status);
        return put_response;
      } else {
        localStorage.removeItem('authTokens');
        console.log('redirect to login');
        navigate('/login/');
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
