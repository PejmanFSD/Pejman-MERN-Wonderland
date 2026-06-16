import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdEdit({ error, setError, setFlash, setIsAdEditing }) {
  const { id } = useParams(); // For extracting the "id"
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // For adding images

  const [company, setCompany] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  // A separate variable for the images that should be deleted:
  const [deleteImages, setDeleteImages] = useState([]);

  // Fetching the existing ad
  useEffect(() => {
    const fetchAd = async () => {
      const response = await fetch(`/ads/${id}`);
      const json = await response.json();
      // if the id is fetched, apply the changes
      if (response.ok) {
        setCompany(json.company);
        setText(json.text);
        setImages(json.images || []);
      }
    };

    fetchAd();
  }, [id]); // Execute whenever the id is changed(fetched)

  // Handling the checkbox toggle
  const handleCheckbox = (filename) => {
    setDeleteImages((currDeleteImages) =>
      // Removing all the images that are in the "deleteImages" array
      currDeleteImages.includes(filename)
        ? currDeleteImages.filter((img) => img !== filename)
        : [...currDeleteImages, filename],
    );
  };

  // Handling Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.append("company", company);
    formData.append("text", text);

    // new images
    if (fileInputRef.current.files.length > 0) {
      for (let file of fileInputRef.current.files) {
        formData.append("image", file);
      }
    }

    // images to delete
    deleteImages.forEach((filename) => {
      formData.append("deleteImages", filename);
    });
    try {
      const response = await fetch(`/ads/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      // The try-catch error-handling if the server returns HTML instead of JSON:
      let json;
      try {
        json = await response.json();
      } catch {
        json = { error: "Invalid server response" };
      }
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
          setError(json.message || json.error || "Edit failed");
        }
        return;
      }
      setFlash(json.message);
      setIsAdEditing(false);
      navigate(`/ads/${id}`);
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const cancelSubmit = () => {
    setIsAdEditing(false);
    navigate(`/ads/${id}`);
  };

  if (!company) return <div>Loading...</div>;

  return (
    <div className="cause" style={{ fontSize: "15px" }}>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h1 className="eater" style={{ fontSize: "40px" }}>
              Edit Ad
            </h1>
            <form className="card p-4 shadow mt-3" onSubmit={handleSubmit}>
              <div class="form-group" style={{ marginTop: "10px" }}>
                <label>
                  <strong>Company name:</strong>
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  class="form-control"
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    width: "250px",
                    height: "40px",
                    marginTop: "10px",
                  }}
                />
              </div>
              <div class="form-group" style={{ marginTop: "15px" }}>
                <label>
                  <strong>Text:</strong>
                </label>
                <div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    class="form-control"
                    style={{
                      margin: "auto",
                      textAlign: "center",
                      width: "250px",
                      height: "95px",
                      marginTop: "10px",
                    }}
                  />
                </div>
              </div>
              <div className="mb-3" style={{ marginTop: "15px" }}>
                <label className="form-label">
                  <strong>Add Images:</strong>
                </label>
                <div>
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    className="form-control form-control-sm"
                    style={{
                      margin: "auto",
                      textAlign: "center",
                      width: "220px",
                      // height: "75px",
                      marginTop: "7px",
                    }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                {images.map((img) => (
                  <div key={img._id}>
                    <img
                      src={img.url}
                      alt=""
                      height="40px"
                      style={{ margin: "5px" }}
                    />
                    <input
                      type="checkbox"
                      onChange={() => handleCheckbox(img.filename)}
                      style={{ marginLeft: "7px" }}
                    />
                    <label style={{ marginLeft: "7px" }}>Delete?</label>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="btn1 align-self-center mb-3 mt-2"
                style={{ margin: "7px" }}
              >
                Update Ad
              </button>
              {error && <div style={{ color: "red" }}>{error}</div>}
            </form>
          </div>
        </div>
      </div>
      <button
        onClick={cancelSubmit}
        className="btn1 align-self-center mt-4"
        style={{ marginTop: "12px", marginBottom: "35px" }}
      >
        Cancel
      </button>
    </div>
  );
}
