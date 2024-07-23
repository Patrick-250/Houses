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
  //bearer token to authorize room update
  const newToken = `Bearer ${token}`;
  //setting user variable that should change on login and logout
  const user = token ? true : false;
  //update the room info
  const [newDiet, setDiet] = useState("");
  const [newTransfer, setTransfer] = useState("");
  const [newMedicationPlan, setMedication] = useState("");
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/rooms/${id}`,
        {
          diet: newDiet,
          transfer: newTransfer,
          medicationPlan: newMedicationPlan,
        },
        {
          headers: { Authorization: newToken },
        }
      );
      setDiet("");
      setMedication("");
      setTransfer("");
      window.location.reload();
      setEdit(false);
    } catch (error) {}
  };
  //console.log(diet, transfer, medicationPlan);
  console.log(id);
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/rooms/${id}`);
        setData(res.data);
        dispatch(getCount(res.data.number));
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoom();
  }, []);
  console.log(data);
  // useEffect(() => {
  //   if (token) {
  //     setEdit(true);
  //   } else {
  //     setEdit(false);
  //   }
  // }, [token]);
  //login and update button that changes dynamically
  let button;
  let update;
  if (!user) {
    button = (
      <Link to={"/Login"} className="link">
        Login to edit Room
      </Link>
    );
  } else if (user) {
    button = (
      <button
        className="link"
        style={{
          backgroundColor: "transparent",
          border: "none",
        }}
        onClick={() => {
          setEdit(true);
        }}
      >
        Edit
      </button>
    );
  }
  if (user && edit) {
    update = (
      <div className="upd" onClick={handleUpdate}>
        Update
      </div>
    );
    button = (
      <div
        className="link"
        onClick={() => {
          setEdit(false);
        }}
      >
        Cancle
      </div>
    );
  }
  return (
    <div className="room-detail">
      <div className="info">Room number :{data.number}</div>
      <div className="info">
        Diet :
        {edit ? (
          <input
            type="text"
            value={newDiet}
            onChange={(e) => {
              setDiet(e.target.value);
            }}
          />
        ) : (
          data.diet
        )}
      </div>
      <div className="info">
        Transfer :
        {edit ? (
          <input
            type="text"
            value={newTransfer}
            onChange={(e) => {
              setTransfer(e.target.value);
            }}
          />
        ) : (
          data.transfer
        )}
      </div>
      <div className="info">
        Medication plan :
        {edit ? (
          <input
            type="text"
            value={newMedicationPlan}
            onChange={(e) => {
              setMedication(e.target.value);
            }}
          />
        ) : (
          data.medicationPlan
        )}
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
        {update}
        <div
          className="btn"
          // onClick={() => {
          //   setEdit(true);
          // }}
        >
          {button}
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
//  {
//    !edit ? (
//      <Link to={"/Login"} className="link">
//        Login to edit Room
//      </Link>
//    ) : (
//    );
//  }
