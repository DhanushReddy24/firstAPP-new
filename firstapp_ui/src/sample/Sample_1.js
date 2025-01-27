import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FlipMove from 'react-flip-move';
import Sample_1Post from './Sample_1Post';
import Logout from '../authentication/Logout';
import ApiDataIOManager from '../common/ApiDataIOManager';

function Sample_1() {
  const [data, setdata] = useState([]);
  const { pk } = useParams();
  const utils = ApiDataIOManager();

  const fetchDataFromApi = async (url, setData) => {
    try {
      const response = await utils.fetchData(url);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    let url = 'sample/sample_1/';
    if (pk) {
      url += `${pk}`;
    }
    fetchDataFromApi(url, setdata);
  }, [pk]);

  return (
    <div>
      <h1>Hello Sample 1 react page</h1>
      <FlipMove>
        {data.map((row) => (
          <div key={row.id}>
            <Sample_1Post
              id={row.id}
              username={row.username}
              firstname={row.firstname}
              lastname={row.lastname}
              age={row.age}
              address={row.address}
              time={row.created_at}
              imageUrl={row.image}
            />
            <Link to={`/sample_1/${row.id}/`}>
              Go to Reply Component with PK {row.id}
            </Link>
          </div>
        ))}
      </FlipMove>
      <Link to="/sample_1_post/">Post</Link>
      <Logout />
      <Link to="/login/">Login</Link>
      <br />
      <Link to="/sample_1/">Sample_1</Link>
    </div>
  );
}

export default Sample_1;
