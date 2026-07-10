import "../../App.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import User from "./User";

export default function Users({
  users,
  setUsers,
  error,
  setError,
  isLoggingOut,
  isDeleting,
  setIsDeleting,
  currentUser,
}) {
  const [page, setPage] = useState(1);
  const [deletingUser, setDeletingUser] = useState(null);
  // For pagination:
  const [totalPages, setTotalPages] = useState(1);
  // For searching a specific user:
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Username");

  const navigate = useNavigate();
  const fetchUsers = async (page = 1, search = "") => {
    let response;
    if (sortBy === "Username") {
      response = await fetch(`/users?page=${page}&search=${search}`, {
        // "?page=${page}"" is for pagination and "&search=${search}" is for searching
        // Before pagination and search it was just "users"
        credentials: "include",
      });
    } else if (sortBy === "Stars") {
      response = await fetch(`/users/topAllUsers?page=${page}`, {
        credentials: "include",
      });
    }
    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Something went wrong");
      return;
    }
    const data = await response.json();
    setUsers(data.users);
    setTotalPages(data.totalPages);
  };
  useEffect(() => {
    fetchUsers(page, search);
  }, [page, search, sortBy]); // Execute the "fetchUsers" function whenever "page" or "search" or "sortBy" change.
  const handleOk = () => {
    navigate(-1);
    setError(null);
  };
  // Specifically for the "isAuthor" and "isAdmin" middlewares:
  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={handleOk} className="btn2">
          Ok
        </button>
      </div>
    );
  }
  const handleDelete = (userId) => {
    setDeletingUser(userId);
    setIsDeleting(true);
  };
  const handleDeleteYes = async (userId) => {
    await fetch(`/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });
    // Removing the user from the state variable:
    setUsers((currUsers) => currUsers.filter((u) => u._id !== userId));
    setDeletingUser(null);
    setIsDeleting(false);
  };
  const handleDeleteNo = () => {
    setDeletingUser(null);
    setIsDeleting(false);
  };
  return (
    <div style={{ marginBottom: "20px", marginTop: "20px" }}>
      {currentUser && !isLoggingOut && (
        <h1
          className="eater"
          style={{ fontSize: "40px", marginBottom: "15px" }}
        >
          All the registered users
        </h1>
      )}
      <div className="container my-3">
        <div className="row">
          <div className="col-sm-4 offset-sm-2 justify-content-center">
            {!isDeleting && !isLoggingOut && (
              <div>
                <input
                  className="cause"
                  type="text"
                  placeholder={sortBy === "Stars" ? "" : "Search user..."}
                  value={sortBy === "Stars" ? "" : search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  disabled={sortBy === "Stars"}
                  class="form-control"
                  style={{
                    margin: "auto",
                    width: "180px",
                    border: "1px solid black",
                    backgroundColor:
                      sortBy === "Stars" ? "lightgray" : "var(--background)",
                    height: "25px",
                    borderRadius: "5px",
                    textAlign: "center",
                    position: "relative",
                    top: "10px",
                  }}
                />
              </div>
            )}
          </div>
          <div className="col-sm-4 justify-content-center">
            {!isDeleting && !isLoggingOut && (
              <div
                className="cause"
                style={{ position: "relative", top: "10px" }}
              >
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    border: "1px solid black",
                    backgroundColor: "var(--background)",
                    textAlign: "center",
                    width: "120px",
                    height: "25px",
                    borderRadius: "5px",
                    fontSize: "14px",
                  }}
                >
                  <option
                    value="Username"
                    style={{ fontSize: "13px" }}
                    disabled
                    selected
                  >
                    Sort by:
                  </option>
                  <option value="Username" style={{ fontSize: "13px" }}>
                    Username
                  </option>
                  <option value="Stars" style={{ fontSize: "13px" }}>
                    Stars
                  </option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
      {sortBy === "Stars" && (
        <div className="container">
          <div className="row">
            <div
              className="col-md-10 offset-md-1 d-flex justify-content-center my-2"
              style={{ fontSize: "12px" }}
            >
              For searching the users, you should have the list sorted based on
              their usernames, not the number of their stars!
            </div>
          </div>
        </div>
      )}
      {(!users || (users && users.length === 0)) && !isLoggingOut ? (
        <div className="cause">No users available</div>
      ) : (
        !isLoggingOut && (
          <table
            border="1"
            cellPadding="10"
            style={{ width: "90%" }}
            className="cause"
            style={{ border: "2px solid black" }}
          >
            <thead>
              <tr style={{ height: "55px", backgroundColor: "var(--primary)" }}>
                <th style={{ width: "15%", border: "1px solid black" }}>
                  Username
                </th>
                <th style={{ width: "9%", border: "1px solid black" }}>Role</th>
                <th style={{ width: "12%", border: "1px solid black" }}>
                  Number of Stars
                </th>
                <th style={{ width: "44%", border: "1px solid black" }}>
                  Message
                </th>
                <th style={{ width: "20%", border: "1px solid black" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  style={{
                    height: "55px",
                    backgroundColor: "var(--background)",
                  }}
                >
                  <td style={{ border: "1px solid black" }}>{user.username}</td>
                  <td style={{ border: "1px solid black" }}>
                    {user.username === "Pejman" ? "The Boss!" : user.role}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {user.username === "Pejman" ? (
                      <div>&#128526;</div>
                    ) : (
                      user.totalPoint
                    )}
                  </td>
                  <td style={{ border: "1px solid black" }}>{user.message}</td>
                  <td style={{ border: "1px solid black" }}>
                    {user.username === "Pejman" && !isDeleting ? (
                      <div>No Action for Pejman &#128526;</div>
                    ) : currentUser.username === "Pejman" && !isDeleting ? (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn1"
                      >
                        Delete
                      </button>
                    ) : user.role === "Admin" && !isDeleting ? (
                      <div>Admin &#128515;</div>
                    ) : (
                      !isDeleting && (
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn1"
                          style={{ display: "inline", height: "30px" }}
                        >
                          Delete
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
      {isDeleting && deletingUser && (
        <div style={{ marginTop: "15px" }} className="cause">
          {`Are you sure you want to delete ${users.find((u) => u._id === deletingUser).username}?`}
          <br />
          <button
            onClick={() => handleDeleteYes(deletingUser)}
            className="btn2 my-2"
            style={{ marginLeft: "10px", width: "40px", height: "35px" }}
          >
            Yes
          </button>
          <button
            onClick={handleDeleteNo}
            className="btn2 my-2"
            style={{ marginLeft: "7px", width: "70px", height: "35px" }}
          >
            Cancel
          </button>
        </div>
      )}
      {!isDeleting && users && users.length > 0 && !isLoggingOut && (
        <div style={{ marginTop: "20px" }} className="cause">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="btn1"
            style={{ width: "100px", height: "35px" }}
          >
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="btn1"
            style={{ width: "100px", height: "35px" }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
