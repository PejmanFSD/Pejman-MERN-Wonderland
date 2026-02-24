import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation, // For hiding the button of the current page
} from "react-router-dom";
import AdForm from "./ads/AdForm";

export default function Navbar({ ads, setAds }) {
  const navigate = useNavigate();
  const location = useLocation();
  //   "location.pathname" is the path of the current page
  return (
    <header>
      <h1>Pejman MERN Wonderland</h1>
      {location.pathname !== "/" && (
        <button onClick={() => navigate("/")}>Home Page</button>
      )}
      {location.pathname !== "/newAd" && (
        <button onClick={() => navigate("/newAd")}>Create new Ad</button>
      )}
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
