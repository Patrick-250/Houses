import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "../../../Redux/Token";
import { useSelector } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { id } = useSelector((state) => state.id);
  const [err, setErr] = useState("");
  console.log(token, id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://172.16.161.30:3000/api/admin/login", {
        username,
        password,
      });
      //console.log(res.data.token);
      //dispatch(getToken(res.data.token));
      JSON.stringify(sessionStorage.setItem("token", res.data.token));
      JSON.stringify(sessionStorage.setItem("userId", res.data.id));

      setUsername("");
      setPassword("");
      window.location.replace("/admin"); // Redirect to /admin after successful login
    } catch (error) {
      setErr(error.response.data.err);
    }
  };

  return (
    <div className="register">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          <div className="nam">Username</div>
          <input
            type="text"
            className="input"
            value={username}
            placeholder="enter username..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label className="label">
          <div className="nam">Password</div>
          <input
            type="password"
            className="input"
            placeholder="enter password..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <span style={{ fontFamily: "sans-serif", color: "red" }}>{err}</span>
        <button className="btn-register" type="submit">
          Login
        </button>
        {/* <span>
          <Link className="link" to={"/Register"} style={{ color: "blue" }}>
            Don't have an account? SignUp
          </Link>
        </span> */}
      </form>
    </div>
  );
};

export default Login;
 