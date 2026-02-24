import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import AdForm from "./ads/AdForm";

export default function Navbar({ ads, setAds }) {
  const navigate = useNavigate();
  return (
    <header>
        <h1>Pejman MERN Wonderland</h1>
        <button onClick={() => navigate("/")}>Home Page</button>
        <button onClick={() => navigate("/newAd")}>Create new Ad</button>
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
        <hr />
    </header>
  );
}
