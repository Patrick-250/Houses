import React, { useState, useEffect } from "react";
import "./RoomDetail.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCount } from "../../../Redux/counter";
import { Button, IconButton, Typography } from "@mui/material";
import { GrDocumentUpdate } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const RoomDetail = () => {
  const { token } = useSelector((state) => state.token);
  const { trigger } = useSelector((state) => state.trigger);
  const { housesArray } = useSelector((state) => state);
  const houseId = JSON.parse(sessionStorage.getItem("houseId"));
  const show = housesArray.userHouse || [];
  const sound = new Audio("/sounds/click.mp3");
  //console.log(housesArray.userHouse.includes(houseId));
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
    sound.play();
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
        setNewName(res.data.name);
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
        // onClick={() => {
        //   navigate(-1);
        // }}
        
      >
        <Link to="/" style={{color:"white"}}>back</Link>
      </Button>
    );

    button = (
      <Button
        // onClick={sound.play()}
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
            sound.play();
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
          sound.play();
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
          sound.play();
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
  //get schedules list
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    const getSchedules = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/schedules/${id}`
        );
        setSchedule(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSchedules();
  }, [trigger]);
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
                  backgroundColor: "#098e57",
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
                placeholder="add more details here....."
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
      {show.includes(houseId) && (
        <div className="schedule">
          <div className="sc">
            <MyCalendar />
            <EventForm />
          </div>
          <div className="cm">
            {" "}
            <div className="t">Schedules</div>
            {schedule.map((sch) => {
              return <Schedules key={sch._id} sch={sch} />;
            })}
          </div>
        </div>
      )}

      <div className="btns">
        <div className="btn-upd">{update}</div>
        <div className="btn">{back}</div>
        <div className="btn">{button}</div>
      </div>
    </div>
  );
};

// the Calender component
//calender details
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
//end calender configs

//Calender Component
const MyCalendar = () => {
  const { trigger } = useSelector((state) => state.trigger);
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const id = location.pathname.split("/")[2];
  useEffect(() => {
    const getSchedules = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/schedules/${id}`
        );
        const formattedSchedules = res.data.map((schedule) => ({
          ...schedule,
          title: schedule.title,
          start: new Date(schedule.start), // Ensure Date objects
          end: new Date(schedule.end), // Ensure Date objects
        }));
        setEvents(formattedSchedules);
      } catch (error) {
        console.log(error);
      }
    };
    getSchedules();
  }, [trigger]);
  return (
    <div className="c">
      <div className="t">Calendar</div>
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
import { callTrigger } from "../../../Redux/trigger";
//calender form
const EventForm = () => {
  const dispatch = useDispatch();
  const { trigger } = useSelector((state) => state.trigger);
  const id = location.pathname.split("/")[2];
  const { token } = useSelector((state) => state.token);
  const newToken = `Bearer ${token}`;
  const [title, setTitle] = useState("");
  const [start, setStartTime] = useState("");
  const [end, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const data = { title, start, end, description, room_id: id };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/schedules",
        data,
        {
          headers: { Authorization: newToken },
        }
      );
      setTitle("");
      setStartTime("");
      setEndTime("");
      setDescription("");
      console.log(res);
      console.log(id);
      dispatch(callTrigger(!trigger));
    } catch (error) {
      console.log(error);
      console.log(id);
    }
  };

  return (
    <form
      className="event-form"
      onSubmit={handleSubmit}
      style={{ width: "100%" }}
    >
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Start Time</label>
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>End Time</label>
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      {/* <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div> */}
      <button type="submit">Add Schedule</button>
    </form>
  );
};

//Schedule Component
import { RiDeleteBin5Line } from "react-icons/ri";
const Schedules = (props) => {
  //console.log(props.sch);
  const { trigger } = useSelector((state) => state.trigger);
  const { token } = useSelector((state) => state.token);
  const newToken = `Bearer ${token}`;
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[2];
  const [title, setTitle] = useState("");
  const [start, setStartTime] = useState("");
  const [end, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(false);
  const data = { title, start, end, description, room_id: id };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:3000/api/schedules/${props.sch._id}`,
      data,
      {
        headers: { Authorization: newToken },
      }
    );
    setTitle("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    dispatch(callTrigger(!trigger));
    setActive((prev) => !prev);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/schedules/${props.sch._id}`,
        {
          headers: { Authorization: newToken },
        }
      );
      dispatch(callTrigger(!trigger));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getSchedules = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/schedules/one/${props.sch._id}`
        );
        const formattedSchedules = res.data.map((schedule) => ({
          title: schedule.title,
          start: new Date(schedule.start), // Ensure Date objects
          end: new Date(schedule.end), // Ensure Date objects
        }));
        setTitle(res.data[0].title);
      } catch (error) {
        console.log(error);
      }
    };
    getSchedules();
  }, [trigger]);
  return (
    <div
      className="items"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        justifyContent: "center",
        padding: "15px",
        alignSelf: "flex-start",
      }}
    >
      <div className="item">
        <Typography variant="h5">{props.sch.title}</Typography>
        <div
          style={{
            width: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <IconButton
            onClick={() => {
              dispatch(callTrigger(!trigger));
              setActive((prev) => !prev);
            }}
          >
            <FaEdit />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <RiDeleteBin5Line />
          </IconButton>
        </div>
      </div>
      <form
        className="me"
        onSubmit={handleSubmit}
        style={{ display: active ? "inline" : "none" }}
      >
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Time</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>End Time</label>
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        {/* <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div> */}
        <Button type="submit">UpdAte Schedule</Button>
      </form>
    </div>
  );
};
