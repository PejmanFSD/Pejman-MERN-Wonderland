import { useState, useEffect } from "react";
import ConfirmationBox from "../Games/ConfirmationBox";

export default function ReviewSection({ game, currentUser }) {
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(3); // The default value for rating is 3
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isReviewEditing, setIsReviewEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingReview, setDeletingReview] = useState(null);
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
      setRating(3);
      // Refreshing the reviews
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setEditBody(review.body);
    setEditRating(review.rating);
  };
  const handleUpdate = async (id) => {
    setIsReviewEditing(true);
    setError(null);
    console.log("Updating review:", id);
    try {
      const response = await fetch(`/reviews/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: editBody,
          rating: editRating,
        }),
      });
      console.log("Response status:", response.status);
      let json;
      try {
        json = await response.json();
      } catch {
        json = { error: "Invalid server response" };
      }
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
      // setFlash(json.message);
      setEditingReviewId(null);
      setIsReviewEditing(false);
      fetchReviews();
      } catch (err) {
      setError("Network error. Please try again.");
    }
  };
  const confirmDelete = (id) => {
    setIsDeleting(true);
    setDeletingReview(id);
  }
  const toggleDeleteCancel = () => {
    setIsDeleting(false);
    setDeletingReview(null);
  }
  const toggleDeleteYes = async (id) => {
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
      // Refreshing the reviews for re-rendering them:
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
    setIsDeleting(false);
    setDeletingReview(null);
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
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingReviewId(null)}>
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
              {(isAuthor || isAdmin) && !isDeleting && (
                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => handleEdit(r)}>Edit</button>
                  <button onClick={() => confirmDelete(r._id)}>Delete</button>
                  {/* <button onClick={() => handleDelete(r._id)}>Delete</button> */}
                </div>
              )}
              {isDeleting && deletingReview === r._id &&
                <ConfirmationBox
                question="Are you sure you want to delete this review?"
                toggleYes={() => toggleDeleteYes(r._id)}
                toggleCancel={toggleDeleteCancel}
                />
              }
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
