import React, { useState, useEffect } from "react";
import "./roomsList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import roomId, { getId } from "../../../Redux/roomId";
import { useDispatch, useSelector } from "react-redux";
const RoomsList = () => {
  const [room, setRoom] = useState([]);
  const dispatch = useDispatch();
  const { houseId } = useSelector((state) => state);
  console.log("houseid", houseId.house_id);
  useEffect(() => {
    const fetchRooms = async () => {
      if (houseId.house_id) {
        const res = await axios.get(
          `http://localhost:3000/api/rooms/house/${houseId.house_id}`
        );
        setRoom(res.data);
        console.log(res.data);
      }
    };
    fetchRooms();
  }, [houseId.house_id]);
  const Welcome = (
    <div className="wel">
      <div className="hi" style={{ fontSize: "30px" }}>
        Hello👋
      </div>
      <span style={{ fontSize: "30px" }}>Welcome to HousesMngt2</span>
    </div>
  );
  const render = room.map((room) => {
    return <Room room={room} key={room._id} />;
  });
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
