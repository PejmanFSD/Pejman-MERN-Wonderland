import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdDetails() {
  const { id } = useParams(); // "useParams" is used for extracting the "id"
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
        <img key={img._id} src={img.url} alt="" height="70px" />
      ))}
      <br></br>
      <Link to={`/ads/${ad._id}/edit`}>
  <button>Edit</button>
</Link>
    </div>
  );
}