import "../../App.css";
import { useEffect } from "react";
import Ad from './Ad';

export default function Ads({ads, setAds}) {
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
          <Ad
            adKey={ad._id}
            adCompany={ad.company}
            adText={ad.text}
            adImages={ad.images && ad.images}
          />
        ))}
    </div>
  );
}
