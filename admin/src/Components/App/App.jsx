import { useState } from "react";
import "./App.css";
import RoomsList from "../RoomList/roomsList";
import Header from "../Header/Header";
import RoomDetail from "../RoomDetail/RoomDetail";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import { useSelector } from "react-redux";

function App() {
  const { token } = useSelector((state) => state.token);
  const user = token ? true : false;

  return (
    <div className="app">
      <Router>
        <Header />
        <div className="ct">
          <Sidebar />
          <Routes>
            <Route path="/admin" element={user ? <RoomsList /> : <Login />} />
            <Route path="/admin/detail/:roomId" element={<RoomDetail />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;