import React, { useState, useEffect } from "react";
import "./RoomDetail.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getCount } from "../../../Redux/counter";

import { useSelector } from "react-redux";
const RoomDetail = () => {
  const { token } = useSelector((state) => state.token);
  console.log(token);
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  console.log(id);
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/rooms/${id}`);
        setData(res.data);
        dispatch(getCount(res.data.number));
        // setNewTitle(res.data.title);
        // setNewDesc(res.data.desc);
        //console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoom();
  }, []);
  console.log(data);
  useEffect(() => {
    if (token) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [token]);
  // if (token) {
  //   setEdit(true)
  // }
  return (
    <div className="room-detail">
      <div className="info">
        Room number :{edit ? <input type="text" /> : data.number}
      </div>
      <div className="info">
        Diet :{edit ? <input type="text" /> : data.diet}
      </div>
      <div className="info">
        Transfer :{edit ? <input type="text" /> : data.transfer}
      </div>
      <div className="info">
        Medication plan :{edit ? <input type="text" /> : data.medicationPlan}
      </div>
      <div className="btns">
        <div
          className="btn"
          onClick={() => {
            dispatch(getCount(null));
          }}
        >
          <Link to={"/"} className="link">
            Home
          </Link>
        </div>
        <div
          className="btn"
          onClick={() => {
            setEdit(true);
          }}
        >
          {!edit ? (
            <Link to={"/Login"} className="link">
              Edit Room
            </Link>
          ) : (
            <button
              className="link"
              style={{
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
