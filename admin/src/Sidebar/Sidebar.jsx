/** @format */
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserTie } from "react-icons/fa";
import { useSelector } from "react-redux";
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
  const { token } = useSelector((state) => state.token);
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
  //fetching the users
  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users");
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
  //fetch users based on the search
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (search) {
          const res = await axios.post(
            "http://localhost:3000/api/users/search",
            {
              name: search,
            }
          );
          console.log(res.data);
          setData(res.data);
        } else {
          const res = await axios.get("http://localhost:3000/api/users");
          console.log(res.data);
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [search]);
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
          <FaUserTie className="icon me u" />
        </Link>

        <div className="x">{x.username}</div>
      </li>
    );
  });
  console.log(data);
  return (
    <>
      {token && (
        <div className={active ? "active" : null} id="sidebar" style={obj}>
          <div className="logo" onClick={toggle}>
            <FaBars className="icon" />
          </div>
          <div className="user">
            <div className="name">
              <span className="o">
                <input
                  type="text"
                  className="search"
                  placeholder="search for a user..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </span>
              {/* <span className="p">software</span> */}
            </div>
          </div>
          <hr />
          <ul className="men" style={{ overflow: "scroll" }}>
            {render}
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
//  to={"/"}
//           onClick={() => {
//             dispatch(getCount(null));
//           }}
