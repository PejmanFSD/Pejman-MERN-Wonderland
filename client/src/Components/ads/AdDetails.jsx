import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdDetails({error, setError, isDeleting, setIsDeleting, setFlash, setIsAdEditing}) {
  const { id } = useParams(); // "useParams" is used for extracting the "id"
  const [ad, setAd] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAd = async () => {
      const response = await fetch(`/ads/${id}`, {
        credentials: "include",
      });
      if (!response.ok) {
        // Specifically for the "isAuthor" and "isAdmin" middlewares:
        const data = await response.json();
        setError(data.error);
        return;
      }
      const data = await response.json();
      setAd(data);
    };
    fetchAd();
  }, [id]);
  const handleOk = () => {
    navigate(-1);
    setError(null);
  }
  // Specifically for the "isAuthor" and "isAdmin" middlewares:
  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={handleOk}>Ok</button>
      </div>
    );
  }
  if (!ad) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    setIsDeleting(true);
  };
  const handleEdit = () => {
    setIsAdEditing(true);
    navigate(`/ads/${ad._id}/edit`);
  }
  const handleDeleteYes = async () => {
    setError(null);
    try {
      const res = await fetch(`/ads/${ad._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error("Delete failed");
      }
      setFlash(json.message);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Could not delete the ad");
    }
    setIsDeleting(false);
  };
  const handleDeleteNo = () => {
    setIsDeleting(false);
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
      {!isDeleting && <button onClick={handleEdit}>Edit</button>}
      <br></br>
      {/* For Delete, we don't use <Link /> because <Link /> only sends the GET request */}
      {!isDeleting && <button onClick={handleDelete}>
        Delete
      </button>}
      <br></br>
      {isDeleting && (
        <div>
          <div>Are you sure you want to delete the ad?</div>
          <button onClick={handleDeleteYes}>Yes</button>
          <button onClick={handleDeleteNo}>No</button>
        </div>
      )}
    </div>
  );
}
