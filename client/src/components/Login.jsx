import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/authContext";
import { API_URL } from "../constants.js";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  async function handleLogin(e) {
    e.preventDefault();
    const res = await axios.post(`${API_URL}/api/v1/user/login`, {
      username: formData.username,
      password: formData.password,
    });

    if (res.status == 200) {
      localStorage.setItem("token", res.data.token);
      toast.success(`${formData.username} Logged In!`);
      setFormData({});
      setIsLoggedIn(true);
      navigate("/courses");
    } else {
      toast.error(`Error in Login`);
    }
  }
  return (
    <>
      <div className="card">
        <h2 className="card-heading">
          Welcome
          <small>Log in to your account</small>
        </h2>
        <form className="card-form" onSubmit={handleLogin}>
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
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
