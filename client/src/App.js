import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/createuser" element={<CreateUser />} />
        <Route exact path="/edituser" element={<EditUser />} /> 
      </Routes>
    </div>
  );
}

export default App;
