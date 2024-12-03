import React from "react";
import { Routes, Route } from "react-router-dom";
import Map from "./pages/Map";
import CreateParking from "./pages/CreateParking";
import Parking from "./pages/Parking";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Map />} />
      <Route path="/admin/create" element={<Parking />} />
      <Route path="/admin/" element={<CreateParking />} />
    </Routes>
  );
}

export default App;
