/** @format */
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FaMedium,
  FaHouseChimneyUser,
  FaMoon,
  FaSun,
  FaBars,
} from "react-icons/fa6";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { getHouseId } from "../../Redux/houseID";
const Sidebar = (props) => {
  const dispatch = useDispatch();

  let obj = {
    display: "flex",
  };
  if (props.trigger) {
    obj.display = "none";
  }
  const [active, setActive] = useState(false);
  const [state, setState] = useState(true);
  const toggle = () => {
    setActive(!active);
  };
  const send = () => {
    setState(!state);
    props.ping(state);
  };
  const icon = state ? (
    <FaMoon className="icon me" onClick={send} />
  ) : (
    <FaSun className="icon me" onClick={send} />
  );
  const mode = !state ? "Light" : "Dark";
  const [data, setData] = useState([]);
  //fetching the houses
  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/houses");
        console.log(res.data);
        setData(res.data);
        // setDiet(res.data.diet);
        // setTransfer(res.data.transfer);
        // setNewDetail(res.data.detail);
        // setMedication(res.data.medicationPlan);
        // dispatch(getCount(res.data.number));
      } catch (error) {
        console.log(error);
      }
    };
    fetchHouse();
  }, []);
  const render = data.map((x) => {
    return (
      <li key={x._id}>
        <Link
          // to={"/"}
          onClick={() => {
            dispatch(getHouseId(x._id));
            console.log(x._id);
          }}
        >
          <FaHouseChimneyUser className="icon me u" />
        </Link>

        <div className="x">{x.name}</div>
        <div className="tool">{x.name}</div>
      </li>
    );
  });
  console.log(data);
  return (
    <div className={active ? "active" : null} id="sidebar" style={obj}>
      <div className="logo" onClick={toggle}>
        <FaBars className="icon" />
      </div>
      <div className="user">
        <div className="name">
          <span className="o">Houses</span>
          {/* <span className="p">software</span> */}
        </div>
      </div>
      <hr />
      <ul className="men">{render}</ul>
    </div>
  );
};

export default Sidebar;
//  to={"/"}
//           onClick={() => {
//             dispatch(getCount(null));
//           }}
