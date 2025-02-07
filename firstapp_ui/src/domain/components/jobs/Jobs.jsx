import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiDataIOManager from '../../../common/ApiDataIOManager';
import Sidebar from '../../../common/AppNav/Sidebar';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'; // MUI Icon

export default function Jobs() {
  const navigate = useNavigate();
  const utils = ApiDataIOManager();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        let url = `job/job/`;
        const response = await utils.fetchData(url);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPostData();
  }, []);

  const handleNavigate = () => {
    navigate('/jobs/job-listing-form');
  };

  // Function to generate dynamic colors
  const getColor = (type) => {
    const colors = [
      'bg-indigo-100 text-indigo-600',
      'bg-green-100 text-green-600',
      'bg-yellow-100 text-yellow-600',
      'bg-red-100 text-red-600',
      'bg-blue-100 text-blue-600',
      'bg-purple-100 text-purple-600',
    ];
    return colors[type.length % colors.length]; // Pick based on string length
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar Section */}
      <div className="w-1/4 bg-white shadow">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="p-6 bg-gray-100 min-h-screen flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Job Listings</h2>

          {/* "List Job" button moved to the top-right corner */}
          <button
            onClick={handleNavigate}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
          >
            List Job
          </button>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-2xl shadow-md relative"
              style={{ backgroundColor: '#f9f9ff' }} // Light touch background
            >
              {/* Bookmark Icon */}
              <div className="absolute top-4 right-4 cursor-pointer">
                <BookmarkBorderIcon className="text-gray-500 hover:text-indigo-600" />
              </div>

              <p className="text-gray-400 text-sm">
                {new Date(job.created_at).toDateString()}
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-2">
                {job.title}
              </h3>
              <p className="text-gray-500">{job.company}</p>

              {/* Dynamic Colored Badges */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${getColor(job.jobType)}`}
                >
                  {job.jobType}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${getColor(job.location)}`}
                >
                  {job.location}
                </span>
              </div>

              <p className="text-lg font-semibold text-gray-900 mt-3">
                ${job.salary}/year
              </p>

              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition w-full">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
