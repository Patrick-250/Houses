import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="register">
      <h2>Register</h2>
      <form className="form">
        <label className="label">
          <div className="name">username</div>
          <input type="text" className="input" />
        </label>
        <label className="label">
          <div className="name">password</div>
          <input type="text" className="input" />
        </label>
        <label className="label">
          <div className="name">comfirm password</div>
          <input type="text" className="input" />
        </label>
        <div className="btn-register">Register</div>
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
