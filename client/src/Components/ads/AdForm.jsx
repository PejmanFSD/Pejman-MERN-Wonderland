import { useState, useEffect, useRef } from "react";
// For returning to the Home Page automatically when the new ad is created
import { useNavigate } from "react-router-dom";

export default function AdForm({ onAdCreated, currentUser, error, setError, setFlash, setIsCreatingAd }) {
  const [company, setCompany] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  // const [error, setError] = useState(null);
  // For clearing the chosen images of the <form /> after creating a new ad:
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPage = async () => {
      if (currentUser.role !== "Admin") {
        setError("Admin access only!");
        return;
      }
    };
    loadPage(); // Refetching when "page" changes
  }, []);

  const handleOk = () => {
    navigate(-1);
    setError(null);
  };
  if (currentUser.role !== "Admin") {
    return (
      <div>
        <p>{error}</p>
        <button onClick={handleOk}>Ok</button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.append("company", company);
    formData.append("text", text);
    for (let i = 0; i < images.length; i++) {
      formData.append("image", images[i]);
    }
    const response = await fetch("/ads", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const json = await response.json();
    // Error handling
    // If the fetching ad process fails:
    if (!response.ok) {
      // If the issue is with the adSchema limitations:
      if (json.errors) {
        const firstError = Object.values(json.errors)[0];
        setError(firstError);
      }
      // If the issue is for something else (like the internet breakdown):
      else {
        setError(json.message || json.error || "Creating new ad failed");
      }
    } else {
      onAdCreated(json);
      setCompany("");
      setText("");
      setImages([]);
      // clearing the chosen images of the <form />
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      setFlash(json.message);
      setIsCreatingAd(false);
      navigate("/");
    }
  };

  const cancelSubmit = () => {
    setIsCreatingAd(false);
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Create a new Ad</h3>
        <div>
          <label htmlFor="company">Ad Company:</label>
          <input
            type="text"
            onChange={(e) => setCompany(e.target.value)}
            id="company"
            name="company"
            value={company}
            required
          />
        </div>
        <div>
          <label htmlFor="text">Ad Text:</label>
          <textarea
            type="text"
            onChange={(e) => setText(e.target.value)}
            id="text"
            name="text"
            value={text}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="image">Ad Image:</label>
          <input
            type="file"
            multiple
            ref={fileInputRef} // For clearing the chosen images after creating a new ad
            onChange={(e) => setImages(e.target.files)}
            id="image"
          />
        </div>
        <button>Create Ad</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
      <button onClick={cancelSubmit}>Cancel</button>
    </div>
  );
}
