import React, { useState } from "react";
import "./Header.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
const Header = () => {
  const { count } = useSelector((state) => state.counter);
  const { token } = useSelector((state) => state.token);
  const { userId } = useSelector((state) => state.userId);
  const [name, setName] = useState("");
  console.log(userId);
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    window.location.replace("/");
  };
  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/users/${userId}`
          );
          setName(res.data.username);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, []);
  return (
    <div className="header">
      <h1>{count ? `Room ${count}` : "Rooms"}</h1>
      {token && (
        <div className="rp">
          <div className="log">
            loged in as:
            <span className="namex">{name}</span>
          </div>
          <button className="out" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
