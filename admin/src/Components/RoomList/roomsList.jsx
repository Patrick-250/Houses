import React, { useState, useEffect } from "react";
import "./roomsList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { HiMiniUserCircle } from "react-icons/hi2";
import roomId, { getId } from "../../../Redux/roomId";
import { useDispatch, useSelector } from "react-redux";
const RoomsList = () => {
  const [user, setUser] = useState([]);
  const { username, email, createdAt, house_names } = user;
  console.log(house_names);
  const date = new Date(createdAt).toDateString();
  const dispatch = useDispatch();
  const { houseId } = useSelector((state) => state);
  console.log("houseid", houseId.house_id);
  useEffect(() => {
    const fetchRooms = async () => {
      if (houseId.house_id) {
        const res = await axios.get(
          `http://localhost:3000/api/users/${houseId.house_id}`
        );
        setUser(res.data);
        console.log(res.data);
      }
    };
    fetchRooms();
  }, [houseId.house_id]);
  const Welcome = (
    <div className="wel" style={{ backgroundColor: "#C17817" }}>
      <div className="hi" style={{ fontSize: "30px" }}>
        Hello &#128075;,
      </div>
      <span style={{ fontSize: "30px" }}>
        Welcome to QLI Houses Admin Pannel
      </span>
    </div>
  ); //delete user function
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/users/delete/${houseId.house_id}`
      );
      console.log(res);
      window.location.replace("/");
    } catch (error) {
      console.error(error);
    }
  };
  console.log(house_names);
  // const houseList = (house_names) => {
  //   if (Array.isArray(house_names)) {
  //     return <div>is loading..</div>;
  //   }
  //   return house_names.map((h, i) => {
  //     return <div key={i}>{h}</div>;
  //   });
  // };
  // console.log(houseList(house_names));
  const render = (
    <div className="user-container">
      <div className="title">User Info</div>
      <div className="user-icon">
        <HiMiniUserCircle style={{ fontSize: "100px", color: "green" }} />
      </div>
      <div className="username">{username}</div>
      <div className="email">{email}</div>
      <div
        className="house"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {house_names}
      </div>
      <div className="date">{`Registered on ${date}`}</div>
      <button className="del" onClick={handleDelete}>
        Delete User
      </button>
    </div>
  );

  return (
    <div className="rooms-container">{houseId.house_id ? render : Welcome}</div>
  );
};

export default RoomsList;
const Room = (props) => {
  //console.log(props.room);
  const { number, _id } = props.room;
  return (
    <div className="room">
      <Link
        to={`/detail/${_id}`}
        className="link"
        state={{ room: props.room }}
        onClick={() => {
          dispatch(getId(_id));
        }}
      >
        {`Room ${number}`}
      </Link>
    </div>
  );
};
