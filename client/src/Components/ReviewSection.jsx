import { useState, useEffect } from "react";

export default function ReviewSection({ game }) {
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(3); // The default value for rating is 3
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, [game]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/reviews?game=${game}`, {
        credentials: "include", // For authentication
      });
      const data = await res.json();
      setReviews(data);
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
        <label style={{marginTop: "10px"}}>Rating: {rating}</label>
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
          style={{marginTop: "10px"}}
          rows="5" cols="25"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your comment..."
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {reviews.map((r) => (
        <div key={r._id}>
          <div>{r.body}</div>
          <small>Rating: {r.rating}</small>
          <br />
          <small>By: {r.author?.username}</small>
        </div>
      ))}
    </div>
  );
}