import React from "react";
import "./roomsList.css";
import { Link } from "react-router-dom";
const RoomsList = () => {
  return (
    <div className="rooms-container">
      <div className="room">
        <Link to={"/detail"} className="link">
          Room 1
        </Link>
      </div>
      <div className="room">
        <Link to={"/detail"} className="link">
          Room 2
        </Link>
      </div>
      <div className="room">
        <Link to={"/detail"} className="link">
          Room 3
        </Link>
      </div>
      <div className="room">
        <Link to={"/detail"} className="link">
          Room 4
        </Link>
      </div>
      <div className="room">
        <Link to={"/detail"} className="link">
          Room 5
        </Link>
      </div>
      <div className="room">
        <Link to={"/detail"} className="link">
          Room 6
        </Link>
      </div>
      <div className="room">
        <Link to={"/detail"} className="link">
          Room 7
        </Link>
      </div>
      <div className="room">
        <Link to={"/detail"} className="link">
          Room 8
        </Link>
      </div>
      <div className="room">
        <Link to={"/detail"} className="link">
          Room 9
        </Link>
      </div>
      <div className="room">
        <Link to={"/detail"} className="link">
          Room 10
        </Link>
      </div>
    </div>
  );
};

export default RoomsList;
