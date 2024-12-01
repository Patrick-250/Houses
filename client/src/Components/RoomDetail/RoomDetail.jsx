import React, { useState, useEffect, useRef } from "react";
import "./RoomDetail.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCount } from "../../../Redux/counter";
import { Button, Typography } from "@mui/material";
import { GrDocumentUpdate } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const RoomDetail = () => {
  const { token } = useSelector((state) => state.token);
  const { housesArray } = useSelector((state) => state);
  const houseId = JSON.parse(sessionStorage.getItem("houseId"));
  const show = housesArray.userHouse || [];
  const sound = new Audio("/sounds/click.mp3");
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
  const detailRef = useRef(null);

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

  useEffect(() => {
    if (edit && detailRef.current) {
      detailRef.current.focus();
    }
  }, [edit]);

  const renederImage = () => {
    if (edit && file) {
      return (
        <img src={URL.createObjectURL(file)} alt="" className="form-img" />
      );
    }
  };
  const image = renederImage();

  let button;
  let update;
  let back = (
    <Button
      sx={{
        color: "white",
        backgroundColor: "#449aba",
        width: "auto",
        fontSize: "18px",
        padding: "5px",
        "&:hover": {
          backgroundColor: "#1e596e",
        },
      }}
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

  if (user) {
    button = (
      <Button
        variant="contained"
        startIcon={<FaEdit style={{ color: "white" }} />}
        className="link"
        onClick={() => {
          setEdit(true);
          sound.play();
        }}
        sx={{
          backgroundColor: "#449aba",
          width: "auto",
          marginLeft: "auto",
          marginRight: "auto",

          padding: "5px 10px",

          fontSize: "18px",

          "&:hover": {
            backgroundColor: "#1e596e",
          },
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
        sx={{
          backgroundColor: "#449aba",
          width: "auto",
          marginLeft: "auto",
          marginRight: "auto",

          padding: "5px 10px",

          fontSize: "18px",

          "&:hover": {
            backgroundColor: "#1e596e",
          },
        }}
      >
        Save
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
        sx={{
          backgroundColor: "#449aba",
          width: "auto",
          marginLeft: "auto",
          marginRight: "auto",

          padding: "5px 10px",

          fontSize: "18px",

          "&:hover": {
            backgroundColor: "#1e596e",
          },
        }}
      >
        Cancel
      </Button>
    );
  }

  return (
    <div className="room-detail">
      <div className="all">
        <div className="profile">
          <img src={PF + photo} alt="profile" className="profile-img" />
          {image}
          {edit && (
            <>
              <label htmlFor="file-input" className="file-input-label">
                Change profile picture
              </label>
              <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
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
            <span className="profile-name">{name}</span>
          )}
        </div>
        <div className="content">
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
              <span>{data.diet || "N/A"}</span>
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
              <span>{data.transfer || "N/A"}</span>
            )}
          </div>
          <div className="info">
            <strong>Medication Plan:</strong>
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
              <span>{data.medicationPlan || "N/A"}</span>
            )}
          </div>
          <div className="info">
            <strong>More Details:</strong>
            <textarea
              className={`in textarea ${
                edit ? "wide-textarea" : "read-only-textarea"
              }`}
              value={newDetail}
              onChange={(e) => {
                setNewDetail(e.target.value);
              }}
              ref={detailRef}
              readOnly={!edit}
            />
          </div>
        </div>
      </div>
      <div className="button-container">
        {back}
        {button}
        {update}
      </div>
    </div>
  );
};

export default RoomDetail;
