import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiDataIOManager from "../common/ApiDataIOManager";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
    dob: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const utils = ApiDataIOManager();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.re_password) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const url = `user/auth/users/`;
      await utils.postData(url, formData);
      navigate("/login/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="re_password"
                value={formData.re_password}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <a href="/login/" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
