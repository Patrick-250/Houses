import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(username, email, password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //setErr(false);
      const res = await axios.post("http://localhost:3000/api/users/regester", {
        username,
        email,
        password,
      });
      setEmail("");
      setPassword("");
      setUsername("");
      res.data && window.location.replace("/login");
      console.log(res);
    } catch (err) {
      console.log(err);
      //setErr(true)
    }
  };
  return (
    <div className="register">
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          <div className="name">username</div>
          <input
            type="text"
            className="input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label className="label">
          <div className="name">email</div>
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
          Register
        </button>
        <span>
          <Link className="link" to={"/Login"} style={{ color: "blue" }}>
            Already have an account? Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
