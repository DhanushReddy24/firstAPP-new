import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiDataIOManager from '../common/ApiDataIOManager';

function Register() {
  const [formData, setFormData] = useState();
  const navigate = useNavigate();
  const utils = ApiDataIOManager();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    try {
      let url = `user/auth/users/`;
      event.preventDefault();
      console.log(formData);
      const response = await utils.postData(url, formData);
      navigate('/login/');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <p>Sign Up</p>

      <form onSubmit={handleSubmit}>
        <label>User name</label>
        <input type="text" name="username" onChange={(e) => onChange(e)} />
        <br />

        <label>First name</label>
        <input type="text" name="first_name" onChange={(e) => onChange(e)} />
        <br />

        <label>Last name</label>
        <input type="text" name="last_name" onChange={(e) => onChange(e)} />
        <br />

        <label>Email</label>
        <input type="text" name="email" onChange={(e) => onChange(e)} />
        <br />

        <label>Password</label>
        <input type="password" name="password" onChange={(e) => onChange(e)} />
        <br />

        <label>Conform Password</label>
        <input
          type="password"
          name="re_password"
          onChange={(e) => onChange(e)}
        />
        <br />

        <input type="submit" value="Sign Up" />
        <a href="/login/" className="ml-2">
          Login
        </a>
      </form>
    </div>
  );
}

export default Register;
