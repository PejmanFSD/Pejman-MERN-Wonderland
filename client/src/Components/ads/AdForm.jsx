import { useState } from "react";

export default function AdForm({ onAdCreated }) {
  const [company, setCompany] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('company', company);
  formData.append('text', text);
  for (let i = 0; i < images.length; i++) {
    formData.append('image', images[i]);
  }
  const response = await fetch('/ads', {
    method: 'POST',
    body: formData
  });
  const json = await response.json();
  if (!response.ok) {
    setError(json.error);
  } else {
    onAdCreated(json);
  }
};

  return (
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
          name="ad[text]"
          value={text}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="image">Ad Image:</label>
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          id="image"
        />
      </div>
      <button>Create Ad</button>
      {error && <div>{error}</div>}
    </form>
  );
}
