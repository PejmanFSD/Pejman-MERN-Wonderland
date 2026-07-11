import { useState, useEffect } from "react";
import ConfirmationBox from "../Games/ConfirmationBox";
import StarRating from "./StarRating";

export default function ReviewSection({ game, currentUser }) {
  const [body, setBody] = useState("");
  const [newRating, setNewRating] = useState(1);
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
    if (newRating < 1 || newRating > 5) return;
    try {
      const res = await fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // For sessions and cookies
        body: JSON.stringify({
          body,
          rating: newRating,
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
      setNewRating(1);
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
  };
  const toggleDeleteCancel = () => {
    setIsDeleting(false);
    setDeletingReview(null);
  };
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
    <div style={{ marginTop: "20px", margin: "auto" }}>
      <div className="container"><div className="row"><div style={{ marginTop: "15px" }} className="col-10 offset-1 d-flex justify-content-center">
        <strong style={{ fontSize: "25px" }}>
          Rate the game and leave your comment
        </strong>
      </div></div></div>
      <div className="container"><div className="row"><div className="col-10 offset-1 d-flex justify-content-center">
      <form onSubmit={handleSubmit}>
        <StarRating rating={newRating} setRating={setNewRating} />
        <textarea
          rows="5"
          cols="25"
          value={body}
          className="form-control"
          style={{
            backgroundColor: "var(--background)",
            border: "2px solid var(--secondary)",
            borderRadius: "8px",
            margin: "auto",
            textAlign: "center",
            width: "340px",
            height: "150px",
            marginTop: "7px",
          }}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your comment..."
          required
        />
        <button
          type="submit"
          className="btn1 align-self-center mb-3"
          style={{ marginTop: "15px" }}
          disabled={editingReviewId || deletingReview}
        >
          Submit
        </button>
      </form>
</div></div></div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="container">
        <div className="row justify-content-center gap-3">
          {reviews.map((r) => {
            const userId = currentUser?._id || currentUser?.id;
            const isAuthor =
              userId &&
              r.author?._id &&
              String(userId) === String(r.author._id);
            const isAdmin = currentUser?.role?.toLowerCase() === "admin";
            return (
              <div
                key={r._id}
                className="form-control"
                style={{
                  backgroundColor: "var(--background)",
                  border: "2px solid var(--secondary)",
                  padding: "10px",
                  borderRadius: "10px",
                  textAlign: "center",
                  width: "340px",
                  height: "220px",
                  paddingTop: "20px",
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
                      className="form-control"
                      style={{
                        margin: "auto",
                        textAlign: "center",
                        width: "300px",
                        height: "85px",
                        marginTop: "7px",
                      }}
                      value={editBody}
                      onChange={(e) => setEditBody(e.target.value)}
                    />
                    <StarRating rating={editRating} setRating={setEditRating} />
                    <button className="btn2 mx-1" type="submit">
                      Save
                    </button>
                    <button
                      className="btn2 mx-1"
                      style={{ width: "70px" }}
                      type="button"
                      onClick={() => setEditingReviewId(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <div>{r.body}</div>
                    <small>⭐ {r.rating}</small>
                    <br />
                  </>
                )}
                <div style={{ marginTop: "7px" }}>
                  <small>By: {r.author?.username}</small>
                </div>
                {(isAuthor || isAdmin) && !isDeleting && !editingReviewId && (
                  <div style={{ marginTop: "10px" }}>
                    <button className="btn2 mx-1" onClick={() => handleEdit(r)}>
                      Edit
                    </button>
                    <button
                      className="btn2 mx-1"
                      style={{ width: "70px" }}
                      onClick={() => confirmDelete(r._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
                {isDeleting && deletingReview === r._id && (
                  <ConfirmationBox
                    question="Are you sure you want to delete this review?"
                    toggleYes={() => toggleDeleteYes(r._id)}
                    toggleCancel={toggleDeleteCancel}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: "20px", marginBottom: "15px" }}>
        <button
          className="btn2"
          disabled={page === 1 || editingReviewId || deletingReview}
          onClick={() => setPage((p) => p - 1)}
        >
          &#8592;
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn2"
          disabled={page === totalPages || editingReviewId || deletingReview}
          onClick={() => setPage((p) => p + 1)}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
