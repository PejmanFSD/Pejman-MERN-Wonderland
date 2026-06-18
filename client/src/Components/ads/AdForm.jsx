import { useState, useEffect, useRef } from "react";
// For returning to the Home Page automatically when the new ad is created
import { useNavigate } from "react-router-dom";

export default function AdForm({
  onAdCreated,
  currentUser,
  error,
  setError,
  setFlash,
  setIsCreatingAd,
}) {
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
    <div className="cause" style={{ fontSize: "15px" }}>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h1 className="eater" style={{ fontSize: "40px" }}>
              Create a new Ad
            </h1>
            <form className="card p-4 shadow mt-3" style={{backgroundColor: "var(--background)"}} onSubmit={handleSubmit}>
              <div class="form-group" style={{ marginTop: "15px" }}>
                <label htmlFor="company">
                  <strong>Ad Company:</strong>
                </label>
                <input
                  type="text"
                  onChange={(e) => setCompany(e.target.value)}
                  id="company"
                  name="company"
                  value={company}
                  required
                  class="form-control"
                  style={{
                    border: "1px solid black",
                    margin: "auto",
                    textAlign: "center",
                    width: "250px",
                    height: "40px",
                    marginTop: "10px",
                  }}
                />
              </div>
              <div class="form-group" style={{ marginTop: "15px" }}>
                <label htmlFor="text">
                  <strong>Ad Text:</strong>
                </label>
                <textarea
                  type="text"
                  onChange={(e) => setText(e.target.value)}
                  id="text"
                  name="text"
                  value={text}
                  required
                  class="form-control"
                  style={{
                    border: "1px solid black",
                    margin: "auto",
                    textAlign: "center",
                    width: "250px",
                    height: "95px",
                    marginTop: "10px",
                  }}
                ></textarea>
              </div>
              <div className="mb-3" style={{ marginTop: "15px" }}>
                <label htmlFor="image" className="form-label">
                  <strong>Ad Image:</strong>
                </label>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef} // For clearing the chosen images after creating a new ad
                  onChange={(e) => setImages(e.target.files)}
                  id="image"
                  className="form-control form-control-sm"
                  style={{
                    border: "1px solid black",
                    margin: "auto",
                    textAlign: "center",
                    width: "250px",
                    marginTop: "10px",
                  }}
                />
              </div>
              <button className="btn1 align-self-center mb-3 mt-2">
                Create Ad
              </button>
              {error && <div style={{ color: "red" }}>{error}</div>}
            </form>
          </div>
        </div>
      </div>
      <button
        onClick={cancelSubmit}
        className="btn1 align-self-center mt-5"
        style={{ marginTop: "15px", marginBottom: "35px" }}
      >
        Cancel
      </button>
    </div>
  );
}
