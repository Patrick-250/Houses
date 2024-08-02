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
      const res = await axios.post("http://localhost:3000/api/users/regester", {
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
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label className="label">
          <div className="nam">Email</div>
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
          <div className="nam">Password</div>
          <input
            type="text"
            className="input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <label id="1" style={{ padding: "5px" }}>
          <input
            type="checkbox"
            value="66a3a4ea688a3fa460f8afed"
            checked={selectedHouse.includes("66a3a4ea688a3fa460f8afed")}
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
            value="66a3a4f0688a3fa460f8afef"
            type="checkbox"
            checked={selectedHouse.includes("66a3a4f0688a3fa460f8afef")}
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
            value="66a3a4f5688a3fa460f8aff1"
            type="checkbox"
            checked={selectedHouse.includes("66a3a4f5688a3fa460f8aff1")}
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
            value="66a3a4fb688a3fa460f8aff3"
            type="checkbox"
            checked={selectedHouse.includes("66a3a4fb688a3fa460f8aff3")}
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
            value="66a3a500688a3fa460f8aff5"
            type="checkbox"
            checked={selectedHouse.includes("66a3a500688a3fa460f8aff5")}
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
            value="66a3a505688a3fa460f8aff7"
            type="checkbox"
            checked={selectedHouse.includes("66a3a505688a3fa460f8aff7")}
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
