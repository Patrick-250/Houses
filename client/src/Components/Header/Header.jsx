import React, { useState } from "react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { Link } from "react-router-dom";
import { getHouseId } from "../../../Redux/houseID";
import { getCount } from "../../../Redux/counter";
const Header = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.counter);
  const { token } = useSelector((state) => state.token);
  const { userId } = useSelector((state) => state.userId);
  const { houseId } = useSelector((state) => state);
  const [name, setName] = useState("");
  const [house, setHouse] = useState("");
  console.log("houseid", houseId);
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
  useEffect(() => {
    if (houseId.house_id) {
      const getHouse = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/houses/${houseId.house_id}`
          );
          setHouse(res.data.name);
        } catch (error) {
          console.log(error);
        }
      };
      getHouse();
    }
  }, [houseId.house_id]);
  console.log(house);
  return (
    <div className="header">
      <Link
        to={"/"}
        onClick={() => {
          dispatch(getHouseId(null));
          dispatch(getCount(null));
        }}
        style={{
          width: "50px",
          height: "50px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SiHomeassistantcommunitystore
          style={{ fontSize: "30px", cursor: "pointer" }}
        />
      </Link>
      <div
        style={{ color: "black", fontFamily: "sans-serif", fontSize: "30px" }}
      >
        {count ? `Room ${count}` : "Welcome"}
      </div>
      <div
        style={{
          color: "black",
          fontFamily: "sans-serif",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        {houseId.house_id && house}
      </div>
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
