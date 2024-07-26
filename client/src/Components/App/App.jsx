import { useState } from "react";
import "./App.css";
import RoomsList from "../RoomList/roomsList";
import Header from "../Header/Header";
import RoomDetail from "../RoomDetail/RoomDetail";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Router>
        <Header />
        <div className="ct">
          <Sidebar />
          <Routes>
            <Route path="/" element={<RoomsList />} />
            <Route path="/detail/:roomId" element={<RoomDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
