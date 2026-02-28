import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import Navbar from "./Components/Navbar";
import Register from "./Components/users/Register";
import Login from "./Components/users/Login";
import AdDetails from "./Components/ads/AdDetails";
import AdEdit from "./Components/ads/AdEdit";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [ads, setAds] = useState([]);
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await fetch("/current-user", {
          credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        if (data.user) {
          setCurrentUser(data.user);
        }
      } catch (err) {
        console.error("Failed to restore user");
      }
    };
    restoreUser();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar currentUser={currentUser} ads={ads} setAds={setAds} setCurrentUser={setCurrentUser} />
        <Routes>
          <Route path="/" element={<Home ads={ads} setAds={setAds} />} />
          <Route path="/register" element={<Register onRegister={(user) => setCurrentUser(user)} />} />
          <Route path="/login" element={<Login onLogin={(user) => setCurrentUser(user)} />} />
          <Route path="/ads/:id" element={<AdDetails />} />
          <Route path="/ads/:id/edit" element={<AdEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
