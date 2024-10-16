import { useState } from "react";
import "./App.css";
import RoomsList from "../RoomList/roomsList";
import Header from "../Header/Header";
import RoomDetail from "../RoomDetail/RoomDetail";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Router>
        <Header />
        <div className="ct">
          <Sidebar />
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/detail/:roomId" element={<RoomDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/rooms" element={<RoomsList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
