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
  console.log(newDiet);
  const [newTransfer, setTransfer] = useState("");
  const [newMedicationPlan, setMedication] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/rooms/${id}`,
        {
          diet: newDiet,
          transfer: newTransfer,
          medicationPlan: newMedicationPlan,
          detail: newDetail,
        },
        {
          headers: { Authorization: newToken },
        }
      );
      //detailUpdate();
      setNewDetail("");
      setDiet("");
      setMedication("");
      setTransfer("");
      window.location.reload();
      setEdit(false);
    } catch (error) {}
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
        dispatch(getCount(res.data.number));
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoom();
  }, []);
  console.log(data);
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

  //setting the details
  // const render = info.map((x) => {
  //   return (
  //     <div className="cotent" style={{ textAlign: "center" }}>
  //       {x.comment}
  //     </div>
  //   );
  // });
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
      <div className="wrapper">
        <div className="com-container">
          {edit && (
            <>
              {" "}
              <div style={{ fontSize: "30px", color: "blue" }}>
                Edit more details
              </div>
              <textarea
                style={{
                  padding: "20px",
                  maxWidth: "100%",
                  marginBottom: "20px",
                }}
                placeholder="Edit more details here....."
                value={newDetail}
                onChange={(e) => {
                  setNewDetail(e.target.value);
                }}
              ></textarea>
            </>
          )}

          {/*the button below shall be used to create the initial details in ur local database*/}
          {/* <button className="sb-btn" type="submit">
            create
          </button> */}
        </div>
        <div className="details">
          <div className="more">More details</div>
          <div className="cotent" style={{ textAlign: "center" }}>
            {data.detail}
          </div>
        </div>
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

//code below might be needed
//  {
//    !edit ? (
//      <Link to={"/Login"} className="link">
//        Login to edit Room
//      </Link>
//    ) : (
//    );
//  }

//  <div className="cotent" style={{ textAlign: "center" }}>
//    dammy
//  </div>;

//  <form className="fm" onSubmit={createDetail}>
//    {edit && (
//      <>
//        {" "}
//        <div style={{ fontSize: "30px", color: "blue" }}>Edit more details</div>
//        <textarea
//          style={{
//            padding: "20px",
//            maxWidth: "100%",
//            marginBottom: "20px",
//          }}
//          placeholder="Edit more details here....."
//          value={detail}
//          onChange={(e) => {
//            setDetail(e.target.value);
//          }}
//        ></textarea>
//      </>
//    )}

//    {/*the button below shall be used to create the initial details in ur local database*/}
//    {/* <button className="sb-btn" type="submit">
//               create
//             </button> */}
//  </form>;
