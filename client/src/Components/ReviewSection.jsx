import { useState, useEffect } from "react";

export default function ReviewSection({ game, currentUser }) {
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(3); // The default value for rating is 3
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [editing, setEditing] = useState({});
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editBody, setEditBody] = useState("");
  const [editRating, setEditRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // For the first time when a game is loaded:
  useEffect(() => {
    setPage(1);
  }, [game]);
  useEffect(() => {
    fetchReviews();
  }, [game, page]);

  const fetchReviews = async () => {
    console.log("currentUser:", currentUser);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/reviews?game=${game}&page=${page}`, {
        credentials: "include", // For authentication
      });
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    if (rating < 1 || rating > 5) return;
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
  const handleEdit = (review) => {
    // setEditing({
    //   id: review._id,
    //   body: review.body,
    //   rating: review.rating
    // });
    setEditingReviewId(review._id);
    setEditBody(review.body);
    setEditRating(review.rating);
  };
  const handleUpdate = async (id) => {
    console.log("Updating review:", id);
    try {
      const res = await fetch(`/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          body: editBody,
          rating: editRating,
        }),
      });
      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);
      if (!res.ok) {
        console.error(data);
        return;
      }

      setEditingReviewId(null);
      // setEditing({});
      fetchReviews(); // refresh
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (id) => {
    // const confirmDelete = window.confirm("Delete this review?");
    // if (!confirmDelete) return;

    try {
      const res = await fetch(`/reviews/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        return;
      }

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
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {reviews.map((r) => {
          const userId = currentUser?._id || currentUser?.id;
const isAuthor =
  userId && r.author?._id && String(userId) === String(r.author._id);
          const isAdmin = currentUser?.role?.toLowerCase() === "admin";
          return (
            <div
              key={r._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              {editingReviewId === r._id ? (
                <form
  onSubmit={(e) => {
    e.preventDefault();
    handleUpdate(r._id);
  }}
>
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                  />
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={editRating}
                    onChange={(e) => setEditRating(Number(e.target.value))}
                  />
                  <button type="button">Save</button>
                  {/* <button type="submit" onClick={() => handleUpdate(r._id)}>Save</button> */}
                  <button type="button" onClick={() => setEditingReviewId(null)}>
                  {/* <button onClick={() => setEditing({})}> */}
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <p>{r.body}</p>
                  <small>⭐ {r.rating}</small>
                </>
              )}
              <br />
              <small>By: {r.author?.username}</small>
              {(isAuthor || isAdmin) && (
                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => handleEdit(r)}>Edit</button>
                  <button onClick={() => handleDelete(r._id)}>Delete</button>
                </div>
              )}
            </div>
          );
        })}
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
