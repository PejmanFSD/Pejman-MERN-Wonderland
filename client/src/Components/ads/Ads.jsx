import "../../App.css";
import { useState, useEffect } from "react";
import Ad from './Ad';

export default function Ads({ads, setAds}) {
  const [idx, setIdx] = useState(0);
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
  if (!ads || ads.length === 0) {
    return <p>No ads available</p>;
  }
  const handleNext = () => {
    setIdx((currAd) =>
      currAd === ads.length - 1 ? 0 : currAd + 1
    );
  };
  const handlePrevious = () => {
    setIdx((currAd) =>
      currAd === 0 ? ads.length - 1 : currAd - 1
    );
  };
  const currentAd = ads[idx];
  return (
    <div>
      <Ad
        adKey={currentAd._id}
        adCompany={currentAd.company}
        adText={currentAd.text}
        adImages={currentAd.images}
      />

      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrevious}>Previous Ad</button>
        <button onClick={handleNext}>Next Ad</button>
      </div>
    </div>
  );
}
