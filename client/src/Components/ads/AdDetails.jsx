import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdDetails() {
  const { id } = useParams(); // "useParams" is used for extracting the "id"
  const [ad, setAd] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure?");
      if (!confirmDelete) return;

      const res = await fetch(`/ads/${ad._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Could not delete the ad");
    }
  };

  return (
    <div>
      <h2>{ad.company}</h2>
      <p>{ad.text}</p>
      {ad.images &&
        ad.images.map((img) => (
          <img key={img._id} src={img.url} alt="" height="70px" />
        ))}
      <br></br>
      <Link to={`/ads/${ad._id}/edit`}>
        <button>Edit</button>
      </Link>
      {/* For Delete, we don't use <Link /> because <Link /> only sends the GET request */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
