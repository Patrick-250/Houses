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

  //checkbox logic
  const [selectedHouse, setSelectedHouse] = useState([]);
  console.log(selectedHouse);
  const handleCheckboxChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedHouse((prev) => [...prev, value]);
    } else {
      setSelectedHouse((prev) => prev.filter((val) => val !== value));
    }
    console.log(selectedHouse);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //setErr(false);
      const res = await axios.post("http://172.16.161.30:3000/api/users/regester", {
        username,
        email,
        password,
        house_ids: selectedHouse,
      });
      setEmail("");
      setPassword("");
      setUsername("");
      res.data && window.location.replace("/");
      console.log(res);
    } catch (err) {
      console.log(err);
      //setErr(true)
    }
  };
  return (
    <div className="register">
      <h2 style={{ fontFamily: "sans-serif" }}>Add a user</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          <div className="nam">Username</div>
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label className="label">
          <div className="nam">Email</div>
          <input
            type="Email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label className="label">
          <div className="nam">Password</div>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <label id="1" style={{ padding: "5px" }}>
          <input
            type="checkbox"
            value="66a924b88b45807187bcd065"
            checked={selectedHouse.includes("66a924b88b45807187bcd065")}
            onChange={handleCheckboxChange}
          />
          <span
            style={{
              color: "black",
              fontFamily: "sans-serif",
              marginLeft: "20px",
            }}
          >
            House 1
          </span>
        </label>
        <label id="1" style={{ padding: "5px" }}>
          <input
            value="66a924c18b45807187bcd067"
            type="checkbox"
            checked={selectedHouse.includes("66a924c18b45807187bcd067")}
            onChange={handleCheckboxChange}
          />
          <span
            style={{
              color: "black",
              fontFamily: "sans-serif",
              marginLeft: "20px",
            }}
          >
            House 2
          </span>
        </label>
        <label id="1" style={{ padding: "5px" }}>
          <input
            value="66a924c58b45807187bcd069"
            type="checkbox"
            checked={selectedHouse.includes("66a924c58b45807187bcd069")}
            onChange={handleCheckboxChange}
          />
          <span
            style={{
              color: "black",
              fontFamily: "sans-serif",
              marginLeft: "20px",
            }}
          >
            House 3
          </span>
        </label>
        <label id="1" style={{ padding: "5px" }}>
          <input
            value="66a924ca8b45807187bcd06b"
            type="checkbox"
            checked={selectedHouse.includes("66a924ca8b45807187bcd06b")}
            onChange={handleCheckboxChange}
          />
          <span
            style={{
              color: "black",
              fontFamily: "sans-serif",
              marginLeft: "20px",
            }}
          >
            House 4
          </span>
        </label>
        <label id="1" style={{ padding: "5px" }}>
          <input
            value="66a924ce8b45807187bcd06d"
            type="checkbox"
            checked={selectedHouse.includes("66a924ce8b45807187bcd06d")}
            onChange={handleCheckboxChange}
          />
          <span
            style={{
              color: "black",
              fontFamily: "sans-serif",
              marginLeft: "20px",
            }}
          >
            House 5
          </span>
        </label>
        <label id="1" style={{ padding: "5px" }}>
          <input
            value="66a924d28b45807187bcd06f"
            type="checkbox"
            checked={selectedHouse.includes("66a924d28b45807187bcd06f")}
            onChange={handleCheckboxChange}
          />
          <span
            style={{
              color: "black",
              fontFamily: "sans-serif",
              marginLeft: "20px",
            }}
          >
            House 6
          </span>
        </label>
        <button className="btn-register" type="submit">
          Add
        </button>
        {/* <span>
          <Link className="link" to={"/Login"} style={{ color: "blue" }}>
            Already have an account? Login
          </Link>
        </span> */}
      </form>
    </div>
  );
};

export default Register;
