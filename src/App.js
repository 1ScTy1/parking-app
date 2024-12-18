import React from "react";
import { Routes, Route } from "react-router-dom";
import Map from "./pages/Map";
import CreateParking from "./pages/CreateParking";
import Parking from "./pages/Parking";

import "./App.css";
import AddCard from "./Components/AddCard";
import Pay from "./Components/Pay";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Map />} />
      <Route path="/admin/create" element={<Parking />} />
      <Route path="/admin/" element={<CreateParking />} />
      <Route path="/addCard" element={<AddCard />} />
      <Route path="/pay" element={<Pay />} />
    </Routes>
  );
}

export default App;
