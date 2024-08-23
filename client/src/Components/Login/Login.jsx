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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { id } = useSelector((state) => state.id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });
      // console.log("login", res);
      //dispatch(getToken(res.data.token));
      JSON.stringify(sessionStorage.setItem("token", res.data.token));
      JSON.stringify(sessionStorage.setItem("userId", res.data.id));
      sessionStorage.setItem("houseIds", JSON.stringify(res.data.house_ids));
      setEmail("");
      setPassword("");
      window.location.replace("/");
    } catch (error) {
      setErr(error.response.data.err);
    }
  };
  return (
    <div className="register">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          <div className="nam">Email</div>
          <input
            type="email"
            className="input"
            value={email}
            placeholder="enter email..."
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label className="label">
          <div className="nam">password</div>
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
