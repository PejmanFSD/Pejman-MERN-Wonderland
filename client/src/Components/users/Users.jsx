import "../../App.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import User from "./User";

export default function Users({
  users,
  setUsers,
  error,
  setError,
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
        <button onClick={handleOk}>Ok</button>
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
    <div>
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      <div>
        Sort by:
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="Username">Username</option>
          <option value="Stars">Stars</option>
        </select>
      </div>
      {!users || (users && users.length === 0) ? (
        <div>No users available</div>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "90%" }}>
          <thead>
            <tr>
              <th style={{ width: "12%" }}>Username</th>
              <th style={{ width: "7%" }}>Role</th>
              <th style={{ width: "5%" }}>Number of Stars</th>
              <th style={{ width: "36%" }}>Message</th>
              <th style={{ width: "30%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.username === "Pejman" ? "The Boss!" : user.role}</td>
                <td>
                  {user.username === "Pejman" ? (
                    <div>&#128526;</div>
                  ) : (
                    user.totalPoint
                  )}
                </td>
                <td>{user.message}</td>
                <td>
                  {user.username === "Pejman" && !isDeleting ? (
                    <div>No Action for Pejman &#128526;</div>
                  ) : currentUser.username === "Pejman" && !isDeleting ? (
                    <button
                      onClick={() => handleDelete(user._id)}
                      style={{ display: "inline" }}
                    >
                      Delete
                    </button>
                  ) : user.role === "Admin" && !isDeleting ? (
                    <div>Admin &#128515;</div>
                  ) : (
                    !isDeleting && (
                      <button
                        onClick={() => handleDelete(user._id)}
                        style={{ display: "inline" }}
                      >
                        Delete
                      </button>
                    )
                  )}
                  {isDeleting && deletingUser === user._id && (
                    <div style={{ display: "inline", marginLeft: "8px" }}>
                      {`Delete ${users.find((u) => u._id === user._id).username}?`}
                      <button
                        onClick={() => handleDeleteYes(user._id)}
                        style={{ marginLeft: "8px" }}
                      >
                        Yes
                      </button>
                      <button
                        onClick={handleDeleteNo}
                        style={{ marginLeft: "4px" }}
                      >
                        No
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!isDeleting && users && users.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
