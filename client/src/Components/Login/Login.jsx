
import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "../../../Redux/Token";
import { useSelector } from "react-redux";
import { setHouse } from "../../../Redux/userHouses";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { id } = useSelector((state) => state.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://172.16.161.30:3000/api/users/login", {
        username,
        password,
      });
      JSON.stringify(sessionStorage.setItem("token", res.data.token));
      JSON.stringify(sessionStorage.setItem("userId", res.data.id));
      sessionStorage.setItem("houseIds", JSON.stringify(res.data.house_ids));
      setUsername("");
      setPassword("");
      window.location.replace("/");
    } catch (error) {
      setErr(error.response.data.err);
    }
  };

  return (
    <div className="register">
      <p>Please log in to continue</p>
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
      </form>
    </div>
  );
};

export default Login;
