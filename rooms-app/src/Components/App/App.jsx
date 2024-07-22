import { useState } from "react";
import "./App.css";
import RoomsList from "../RoomList/roomsList";
import Header from "../Header/Header";
import RoomDetail from "../RoomDetail/RoomDetail";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<RoomsList />} />
          <Route path="/detail" element={<RoomDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
