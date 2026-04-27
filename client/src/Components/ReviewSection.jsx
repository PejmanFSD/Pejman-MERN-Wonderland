import { useState, useEffect } from "react";

export default function ReviewSection({ game }) {
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(3); // The default value for rating is 3
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchReviews();
  }, [game, page]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/reviews?game=${game}&page=${page}`, {
        credentials: "include", // For authentication
      });
      const data = await res.json();
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // For sessions and cookies
        body: JSON.stringify({
          body,
          rating,
          game, // Saving the specific game
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        return;
      }
      // Reseting the form:
      setBody("");
      setRating(1);
      // Refreshing the reviews
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <strong>Leave your comment</strong>

      <form onSubmit={handleSubmit}>
        <label style={{ marginTop: "10px" }}>Rating: {rating}</label>
        <br />
        <input
          type="range"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <br />
        <textarea
          style={{ marginTop: "10px" }}
          rows="5"
          cols="25"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your comment..."
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {reviews.map((r) => (
          <div
            key={r._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <p>{r.body}</p>
            <small>⭐ {r.rating}</small>
            <br />
            <small>By: {r.author?.username}</small>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          &#8592;
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
