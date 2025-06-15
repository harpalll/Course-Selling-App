import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { API_URL } from "../constants.js";

export const AdminRegister = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    const res = await axios.post(`${API_URL}/api/v1/admin/signup`, {
      username: formData.username,
      password: formData.password,
    });

    if (res.status == 200) {
      toast.success(`${formData.username} Registered Successfully!`);
      setFormData({});
      navigate("/admin/auth/login");
    } else {
      toast.error(`Error in registration`);
    }
  }
  return (
    <>
      <div className="card">
        <h2 className="card-heading">
          Get started
          <small>Let us create admin account</small>
        </h2>
        <form className="card-form" onSubmit={handleRegister}>
          <div className="input">
            <input
              type="text"
              className="input-field"
              value={formData.username}
              onChange={(e) => {
                setFormData((formData) => ({
                  ...formData,
                  username: e.target.value,
                }));
              }}
              required
            />
            <label className="input-label">User name</label>
          </div>
          <div className="input">
            <input
              type="password"
              className="input-field"
              required
              value={formData.password}
              onChange={(e) => {
                setFormData((formData) => ({
                  ...formData,
                  password: e.target.value,
                }));
              }}
            />
            <label className="input-label">Password</label>
          </div>
          <div className="action">
            <button className="action-button" type="submit">
              Get started
            </button>
          </div>
        </form>
        <div className="card-info">
          <p>
            By signing up you are agreeing to our{" "}
            <a href="#">Terms and Conditions</a>
          </p>
        </div>
      </div>
    </>
  );
};
