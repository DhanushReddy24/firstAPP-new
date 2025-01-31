import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ApiDataIOManager from '../../../common/ApiDataIOManager';

export default function Jobs() {
  const navigate = useNavigate();
  const utils = ApiDataIOManager();
  const [userData, setuserData] = useState(() =>
  localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : { id: null }
  );  
  const [jobs, setJob] = useState([]);

  const fetchPostData = async () => {
    try {
      let url = `job/job/`;
      const response = await utils.fetchData(url);
      let data = await response.data;
      setJob(data);
      console.log(jobs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  const handleNavigate = () => {
    navigate("/jobs/job-listing-form");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Jobs</h2>
      {jobs.map((job) => (
      <div>
        <p>{job.id}</p> 
        <p>{job.title}</p> 
        <p>{job.company}</p> 
        <p>{job.description}</p> 
        <p>{job.location}</p> 
        <p>{job.jobType}</p> 
        <p>{job.salary}</p> 
        <p>{job.created_at}</p> 
      </div>
      ))}
      <button
        onClick={handleNavigate}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        List Job
      </button>
    </div>
  );
}
