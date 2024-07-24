import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "../../../Redux/Token";
import { useSelector } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { id } = useSelector((state) => state.id);
  console.log(token, id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });
      //console.log(res.data.token);
      //dispatch(getToken(res.data.token));
      JSON.stringify(sessionStorage.setItem("token", res.data.token));
      JSON.stringify(sessionStorage.setItem("userId", res.data.id));

      setEmail("");
      setPassword("");
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          <div className="name">Email</div>
          <input
            type="text"
            className="input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label className="label">
          <div className="name">password</div>
          <input
            type="text"
            className="input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button className="btn-register" type="submit">
          Login
        </button>
        <span>
          <Link className="link" to={"/Register"} style={{ color: "blue" }}>
            Don't have an account? SignUp
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
