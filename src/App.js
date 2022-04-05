import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-200 min-h-screen p-5">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
