import {useState} from "react";

export default function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(null);
  return (
    <div style={{ display: "flex", gap: "5px", cursor: "pointer", justifyContent: "center" }}>
    {/* Rendering the stars: */}
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = hover !== null
          ? star <= hover
          : star <= rating;
        // For each star, return the following <span />:
        return (
          <span
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            style={{
              fontSize: "24px",
              color: isActive ? "gold" : "lightgray",
              transition: "color 0.2s",
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};