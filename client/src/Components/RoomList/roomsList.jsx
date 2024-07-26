import React, { useState, useEffect } from "react";
import "./roomsList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getId } from "../../../Redux/roomId";
import { useDispatch } from "react-redux";
const RoomsList = () => {
  const [room, setRoom] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get("http://localhost:3000/api/rooms");
      setRoom(res.data);
      console.log(res.data);
    };
    fetchRooms();
  }, []);
  const render = room.map((room) => {
    return <Room room={room} key={room._id} />;
  });
  return <div className="rooms-container">{render}</div>;
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
