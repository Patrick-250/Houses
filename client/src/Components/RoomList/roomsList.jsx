import React, { useState, useEffect } from "react";
import "./roomsList.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import roomId, { getId } from "../../../Redux/roomId";
import { useDispatch, useSelector } from "react-redux";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";

const RoomsList = () => {
  const [room, setRoom] = useState([]);
  const dispatch = useDispatch();
  const { houseId } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      if (houseId.house_id) {
        const res = await axios.get(
          `http://172.16.161.30:3000/api/rooms/house/${houseId.house_id}`
        );
        setRoom(res.data);
      }
    };
    fetchRooms();
  }, [houseId.house_id]);

  const handleBackClick = () => {
    navigate("/"); 
  };

  const render = room.map((room) => {
    return <Room room={room} key={room._id} />;
  });

  return (
    <div className="rooms-container">
      {houseId.house_id ? render : <WelcomeScreen />}
      <button onClick={handleBackClick} className="back-button">
        Back
      </button>
    </div>
  );
};

export default RoomsList;

const Room = (props) => {
  const sound = new Audio("/sounds/click.mp3");
  const { number, _id } = props.room;
  const dispatch = useDispatch();
  const { houseId } = useSelector((state) => state);

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