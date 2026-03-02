import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import ProtectedRoute from './Components/ProtectedRoute';
import Navbar from "./Components/Navbar";
import Register from "./Components/users/Register";
import Login from "./Components/users/Login";
import AdDetails from "./Components/ads/AdDetails";
import AdEdit from "./Components/ads/AdEdit";
import Users from "./Components/users/Users";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [ads, setAds] = useState([]);
  const [users, setUsers] = useState([]);
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
        <Navbar
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          ads={ads}
          setAds={setAds} 
          users={users}
          setUsers={setUsers}
        />
        <Routes>
          <Route path="/" element={<Home ads={ads} setAds={setAds} />} />
          <Route path="/register" element={<Register onRegister={(user) => setCurrentUser(user)} />} />
          <Route path="/login" element={<Login onLogin={(user) => setCurrentUser(user)} />} />
          <Route path="/ads/:id" element={<ProtectedRoute currentUser={currentUser}><AdDetails /></ProtectedRoute>} />
          <Route path="/ads/:id/edit" element={<AdEdit />} />
          <Route path="/users" element={<ProtectedRoute currentUser={currentUser}><Users users={users} setUsers={setUsers} /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
