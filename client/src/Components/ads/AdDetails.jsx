import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdDetails({
  error,
  setError,
  isDeleting,
  setIsDeleting,
  setFlash,
  setIsAdEditing,
  isLoggingOut,
}) {
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
  };
  // Specifically for the "isAuthor" and "isAdmin" middlewares:
  if (error) {
    return (
      <div>
        <p className="my-3">{error}</p>
        <button onClick={handleOk} className="btn2 my-1">
          Ok
        </button>
      </div>
    );
  }
  if (!ad) {
    return <div style={{ marginTop: "20px" }}>Loading...</div>;
  }

  const handleDelete = () => {
    setIsDeleting(true);
  };
  const handleEdit = () => {
    setIsAdEditing(true);
    navigate(`/ads/${ad._id}/edit`);
  };
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
    <div className="cause" style={{ fontSize: "15px", marginTop: "20px" }}>
      {!isLoggingOut && <h2>{ad.company}</h2>}
      {!isLoggingOut && <p>{ad.text}</p>}
      {ad.images &&
        !isLoggingOut &&
        ad.images.map((img) => (
          <img
            key={img._id}
            src={img.url}
            alt=""
            height="70px"
            style={{ margin: "10px" }}
          />
        ))}
      <br></br>
      {!isDeleting && !isLoggingOut && (
        <button
          onClick={handleEdit}
          className="btn1 my-3"
          style={{ margin: "5px" }}
        >
          Edit
        </button>
      )}
      {/* For Delete, we don't use <Link /> because <Link /> only sends the GET request */}
      {!isDeleting && !isLoggingOut && (
        <button
          onClick={handleDelete}
          className="btn1 my-3"
          style={{ margin: "5px" }}
        >
          Delete
        </button>
      )}
      {isDeleting && !isLoggingOut && (
        <div>
          <div>Are you sure you want to delete the ad?</div>
          <button
            onClick={handleDeleteYes}
            className="btn2 my-3"
            style={{ margin: "5px" }}
          >
            Yes
          </button>
          <button
            onClick={handleDeleteNo}
            className="btn2 my-3"
            style={{ margin: "5px", width: "80px" }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
