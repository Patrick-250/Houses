import React, { useState, useEffect } from "react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getHouseId } from "../../../Redux/houseID";
import { getCount } from "../../../Redux/counter";
import logo from "../../assets/images/logo.png";
import { Button } from "@mui/material";
import { IoIosLogIn } from "react-icons/io";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { count } = useSelector((state) => state.counter);
  const { token } = useSelector((state) => state.token);
  const { userId } = useSelector((state) => state.userId);
  const { houseId } = useSelector((state) => state);
  const [name, setName] = useState("");
  const [house, setHouse] = useState("");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("houseId");
    sessionStorage.removeItem("houseIds");
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
  }, [userId]);

  useEffect(() => {
    if (houseId.house_id) {
      const getHouse = async () => {
        try {
          const res = await axios.get(
            `http://:3000/api/houses/${houseId.house_id}`
          );
          setHouse(res.data.name);
        } catch (error) {
          console.log(error);
        }
      };
      getHouse();
    }
  }, [houseId.house_id]);

  return (
    <div className="header">
      <Link
        to={"/"}
        onClick={() => {
          dispatch(getHouseId(null));
          dispatch(getCount(null));
          window.location.replace("/");
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
      <div style={{ color: "black", fontFamily: "gotham" }}>
        {count ? `Room ${count}` : ""}
      </div>
      <div
        style={{
          color: "black",
          fontStyle: "gotham",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {houseId.house_id && house}
      </div>
      {token ? (
        <div className="rp">
          <div className="log" style={{ color: "black", fontStyle: "gotham" }}>
            Hi {name},<br />
            Welcome
          </div>
          <button className="out" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <Button
          style={{ color: "white", backgroundColor: "#315659" }}
          variant="contained"
          startIcon={
            <IoIosLogIn
              style={{ color: "white", backgroundColor: "#315659" }}
            />
          }
          onClick={() => navigate("/Login")}
          sx={{
            backgroundColor: "#449aba",
            fontSize: "26px",
            padding: "5px",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#1e596e",
              borderRadius: "30px",
            },
          }}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Header;
