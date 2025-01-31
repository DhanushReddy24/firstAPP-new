import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const JobListingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/jobs");
  };

  const onSubmit = (data) => {
    console.log("Job Listing Data:", data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Post a Job Listing
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Job title is required" })}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter job title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            {...register("company", { required: "Company name is required" })}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter company name"
          />
          {errors.company && (
            <p className="text-red-500 text-sm">{errors.company.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            {...register("description", {
              required: "Job description is required",
            })}
            rows="4"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter job description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            {...register("jobType", { required: "Please select a job type" })}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.jobType && (
            <p className="text-red-500 text-sm">{errors.jobType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <select
            {...register("location", { required: "Please select a location" })}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Location</option>
            <option value="Remote">Remote</option>
            <option value="New York, USA">New York, USA</option>
            <option value="San Francisco, USA">San Francisco, USA</option>
            <option value="London, UK">London, UK</option>
            <option value="Bangalore, India">Bangalore, India</option>
          </select>
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salary ($ per year)
          </label>
          <input
            type="number"
            {...register("salary", {
              required: "Salary is required",
              min: { value: 10000, message: "Salary must be at least $10,000" },
            })}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter salary amount"
          />
          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
  <button
    type="submit"
    className="px-6 py-2 w-full sm:w-auto bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
  >
    Post Job
  </button>

  <button
    type="button"
    onClick={handleCancel}
    className="px-6 py-2 w-full sm:w-auto bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
  >
    Cancel
  </button>
</div>
      </form>
    </div>
  );
};

export default JobListingForm;
