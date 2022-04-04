import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from "./components/add";
import Home from "./components/home";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-200 min-h-screen p-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
