import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Navbar from "./Components/Navbar";
import Register from "./Components/users/Register";
import AdDetails from "./Components/ads/AdDetails";
import AdEdit from "./Components/ads/AdEdit";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [ads, setAds] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar currentUser={currentUser} ads={ads} setAds={setAds} />
        <Routes>
          <Route path="/" element={<Home ads={ads} setAds={setAds} />} />
          <Route path="/register" element={<Register onRegister={(user) => setCurrentUser(user)} />} />
          <Route path="/ads/:id" element={<AdDetails />} />
          <Route path="/ads/:id/edit" element={<AdEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
