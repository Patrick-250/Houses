import React, { useState, useEffect } from "react";
import "./RoomDetail.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCount } from "../../../Redux/counter";
import { Button } from "@mui/material";
import { GrDocumentUpdate } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
//calender details
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
//end calender configs

const RoomDetail = () => {
  const { token } = useSelector((state) => state.token);
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const newToken = `Bearer ${token}`;
  const user = token ? true : false;
  const [newDiet, setDiet] = useState("");
  const [newName, setNewName] = useState("");
  const [newTransfer, setTransfer] = useState("");
  const [newMedicationPlan, setMedication] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [err, setErr] = useState("");
  const PF = "http://localhost:3000/images/";

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newInfo = {
      transfer: newTransfer,
      detail: newDetail,
      medicationPlan: newMedicationPlan,
      diet: newDiet,
      name: newName,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newInfo.profilePic = filename;
      try {
        await axios.post("http://localhost:3000/api/upload", data);
      } catch (error) {}
    }
    try {
      await axios.put(`http://localhost:3000/api/rooms/${id}`, newInfo, {
        headers: { Authorization: newToken },
      });
      setNewDetail("");
      setDiet("");
      setMedication("");
      setTransfer("");
      setEdit(false);
    } catch (error) {
      setErr(error.response.data.err);
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/rooms/${id}`);
        setData(res.data);
        setDiet(res.data.diet);
        setTransfer(res.data.transfer);
        setNewDetail(res.data.detail);
        setMedication(res.data.medicationPlan);
        setPhoto(res.data.profilePic);
        setName(res.data.name);
        dispatch(getCount(res.data.number));
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoom();
  }, [edit]);

  let button;
  let update;
  let back;
  if (!user) {
    back = (
      <Button
        variant="contained"
        startIcon={<IoIosArrowBack style={{ color: "white" }} />}
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </Button>
    );

    button = (
      <Button
        variant="contained"
        startIcon={<IoIosLogIn style={{ color: "white" }} />}
      >
        <Link
          to={"/Login"}
          style={{
            width: "170px",
            textDecoration: "none",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Login to edit Room
        </Link>
      </Button>
    );
  } else if (user) {
    if (!edit) {
      back = (
        <Button
          variant="contained"
          startIcon={<IoIosArrowBack style={{ color: "white" }} />}
          onClick={() => {
            navigate(-1);
          }}
        >
          back
        </Button>
      );
    }
    button = (
      <Button
        variant="contained"
        startIcon={<FaEdit />}
        className="link"
        onClick={() => {
          setEdit(true);
        }}
      >
        Edit
      </Button>
    );
  }
  if (user && edit) {
    update = (
      <Button
        variant="contained"
        startIcon={<GrDocumentUpdate style={{ color: "white" }} />}
        onClick={handleUpdate}
      >
        Update
      </Button>
    );
    button = (
      <Button
        variant="contained"
        startIcon={<GiCancel style={{ color: "red" }} />}
        onClick={() => {
          setEdit(false);
        }}
      >
        Cancel
      </Button>
    );
  }

  const renederImage = () => {
    if (edit && file) {
      return (
        <img src={URL.createObjectURL(file)} alt="" className="form-img" />
      );
    }
  };
  const image = renederImage();

  return (
    <div className="room-detail">
      {/*<div className="info">Room number :{data.number}</div> */}
      <div className="all">
        <div
          className="profile"
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <img
            src={PF + photo}
            alt="profile"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "20px",
              objectFit: "cover",
              border: "5px solid white",
            }}
          />
          {image}
          {edit && (
            <>
              <label
                htmlFor="file-input"
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  backgroundColor: "green",
                  color: "white",
                  padding: "5px",
                  borderRadius: "4px",
                  fontFamily: "sans-serif",
                  margin: "5px",
                }}
              >
                Change profile picture
              </label>
              <input
                type="file"
                id="file-input"
                style={{
                  display: "none",
                }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </>
          )}
          {edit ? (
            <input
              type="text"
              placeholder="name..."
              className="name-input"
              autoFocus={true}
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
          ) : (
            <span
              style={{
                fontFamily: "sans-serif",
                color: "black",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              {name}
            </span>
          )}
        </div>
        <div
          className="content"
          style={{
            flex: "2",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <div className="info">
            <strong>Diet:</strong>
            {edit ? (
              <input
                className="in"
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
            <strong>Transfer:</strong>
            {edit ? (
              <input
                className="in"
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
            <strong>Medication plan:</strong>
            {edit ? (
              <input
                className="in"
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
          <div className="info">
            <strong>More details:</strong>
            {edit ? (
              <textarea
                style={{ maxWidth: "400px", maxHeight: "100px" }}
                cols={120}
                rows={15}
                placeholder="Edit more details here....."
                value={newDetail}
                onChange={(e) => {
                  setNewDetail(e.target.value);
                }}
              ></textarea>
            ) : (
              <p className="info">{data.detail}</p>
            )}
          </div>
        </div>
      </div>
      <span style={{ alignSelf: "center", color: "red", fontSize: "20px" }}>
        {err}
      </span>
      <div className="btns">
        <div className="btn-upd">{update}</div>
        <div className="btn">{back}</div>
        <div className="btn">{button}</div>
      </div>
    </div>
  );
};

// the Calender component

const MyCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([
    {
      title: "Meeting",
      start: new Date(),
      end: new Date(moment().add(1, "hours").toDate()),
    },
    {
      title: "Another Meeting",
      start: new Date(moment().add(2, "days").toDate()),
      end: new Date(moment().add(2, "days").add(2, "hours").toDate()),
    },
  ]);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};
export default RoomDetail;
