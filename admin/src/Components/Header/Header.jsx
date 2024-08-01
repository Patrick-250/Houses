import React, { useState, useEffect } from "react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { getHouseId } from "../../../Redux/houseID";
import { getCount } from "../../../Redux/counter";
import logo from "../../assets/images/logo.png";
import { TiUserAdd } from "react-icons/ti";
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
            `http://localhost:3000/api/admin/${userId}`
          );
          setName(res.data.username);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [userId]);

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
        <img
          src={logo}
          alt="QLI logo"
          style={{
            width: "190px",
            height: "30px",
            cursor: "pointer",
            color: "black",
          }}
        />
      </Link>
      <div
        style={{
          color: "black",
          fontFamily: "sans-serif",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Administrator Pannel
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
        <div className="add">
          <Link to={"/Register"}>
            <TiUserAdd style={{ fontSize: "35px", cursor: "pointer" }} />
          </Link>
        </div>
      )}

      {token && (
        <div className="rp">
          <div className="log" style={{ color: "black", fontStyle: "oblique" }}>
            Hi {name},<br />
            Welcome
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
