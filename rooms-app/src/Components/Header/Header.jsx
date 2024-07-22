import React from "react";
import "./Header.css";
import { useSelector } from "react-redux";
const Header = () => {
  const { count } = useSelector((state) => state.counter);
  return (
    <div className="header">
      <h1>{count ? `Room ${count}` : "Rooms"}</h1>
    </div>
  );
};

export default Header;
