import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import AdForm from "./ads/AdForm";

export default function Navbar({ads, setAds}) {
  return (
    <header>
      <div>
        <h1>Pejman MERN Wonderland</h1>
        <Link to="/">Home Page</Link>
        <Link to="/newAd">Create new Ad</Link>
        <Routes>
          <Route
            path="/newAd"
            element={
              <AdForm
                onAdCreated={(newAd) => {
                  setAds((currAds) => [newAd, ...currAds]);
                }}
              />
            }
          />
        </Routes>
      </div>
    </header>
  );
}
