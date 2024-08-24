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
  // console.log("houseid", houseId.house_id);

  useEffect(() => {
    const fetchRooms = async () => {
      if (houseId.house_id) {
        const res = await axios.get(
          `http://localhost:3000/api/rooms/house/${houseId.house_id}`
        );
        setRoom(res.data);
        // console.log(res.data);
      }
    };
    fetchRooms();
  }, [houseId.house_id]);

  const Welcome = (
    <div className="wel" style={{ Color: "white" }}>
      <h1 style={{ fontSize: "30px", color: "white" }}>
        Welcome to QLI Houses{" "}
      </h1>
    </div>
  );

  const render = room.map((room) => {
    return <Room room={room} key={room._id} />;
  });

  return (
    <div className="rooms-container">
      <iframe
        id="background-video"
        src="https://www.youtube.com/embed/DNBb86QVons?autoplay=1&mute=1&loop=1&playlist=DNBb86QVons&controls=0&showinfo=0&modestbranding=1"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      {houseId.house_id ? render : Welcome}
    </div>
  );
};

export default RoomsList;

const Room = (props) => {
  const sound = new Audio("/sounds/click.mp3");
  const { number, _id } = props.room;
  return (
    <div
      className="room"
      onClick={() => {
        dispatch(getHouseId(houseId.house_id));
      }}
    >
      <Link
        to={`/detail/${_id}`}
        className="link"
        state={{ room: props.room }}
        onClick={() => {
          sound.play();
          dispatch(getId(_id));
        }}
      >
        {`Room ${number}`}
      </Link>
    </div>
  );
};
