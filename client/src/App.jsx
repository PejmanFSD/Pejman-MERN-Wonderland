import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Navbar from "./Components/Navbar";
import AdDetails from "./Components/ads/AdDetails";

function App() {
  const [ads, setAds] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar ads={ads} setAds={setAds} />
        <Routes>
          <Route path="/" element={<Home ads={ads} setAds={setAds} />} />
          <Route path="/ads/:id" element={<AdDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
