import { useState, useEffect } from "react";
import axios from "axios";

function FetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null})

  const fetchData = async () => {
    try {
      let apiUrl = url;

      console.log(apiUrl)
      console.log(authTokens.access)
      const response = await axios.get(apiUrl,{
        'headers': { 
          'Content-Type':'application/json',
          'Authorization': 'JWT ' +String(authTokens.access) 
        }
      });
      setData(response.data);
      setLoading(false);
      
    } 
    catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(data)
    console.log(loading)
  }, [url]);
  return ( data, loading );
}

export default FetchData;
