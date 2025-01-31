import React from "react";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/jobs/job-listing-form");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Jobs</h2>

      <button
        onClick={handleNavigate}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        List Job
      </button>
    </div>
  );
}
