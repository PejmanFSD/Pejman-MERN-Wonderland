import "./App.css";
import { useState, useEffect } from "react";

export default function Ads() {
  const [ads, setAds] = useState(null);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("/ads", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch ads");
        }
        const data = await response.json();
        console.log("DATA FROM SERVER:", data);
        setAds(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAds();
  }, []);
  return (
    <div>
      {ads &&
        ads.map((ad) => (
          <div key={ad._id}>
            {ad.company}: {ad.text}
          </div>
        ))}
    </div>
  );
}
