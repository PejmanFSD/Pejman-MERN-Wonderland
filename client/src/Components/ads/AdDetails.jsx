import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      const response = await fetch(`/ads/${id}`);
      const json = await response.json();
      if (response.ok) {
        setAd(json);
      }
    };
    fetchAd();
  }, [id]);

  if (!ad) return <div>Loading...</div>;

  return (
    <div>
      <h2>{ad.company}</h2>
      <p>{ad.text}</p>
      {ad.images && ad.images.map((img) => (
        <img key={img._id} src={img.url} alt="" width="300" />
      ))}
    </div>
  );
}