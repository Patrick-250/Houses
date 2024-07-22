import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="register">
      <h2>Login</h2>
      <form className="form">
        <label className="label">
          <div className="name">username</div>
          <input type="text" className="input" />
        </label>
        <label className="label">
          <div className="name">password</div>
          <input type="text" className="input" />
        </label>
        <div className="btn-register">Login</div>
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
