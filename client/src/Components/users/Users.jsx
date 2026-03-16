import "../../App.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import User from "./User";

export default function Users({ users, setUsers, error, setError, isDeleting, setIsDeleting, currentUser }) {
  const [page, setPage] = useState(1);
  const [deletingUser, setDeletingUser] = useState(null);
  // For pagination:
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`/users?page=${page}`, { // `/users?page=${page}` is the new path for pagination.
        // Before pagination it was "users"
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Something went wrong");
        return;
      }
      const data = await response.json();
      console.log("DATA FROM SERVER:", data);
      setUsers(data.users);
      setTotalPages(data.totalPages);
    };
    fetchUsers(); // Refetching when "page" changes
  }, [page]);
  const handleOk = () => {
    navigate(-1);
    setError(null);
  }
  // Specifically for the "isAuthor" and "isAdmin" middlewares:
  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={handleOk}>Ok</button>
      </div>
    );
  }
  else if (!users || users.length === 0) {
    return <p>No users available</p>;
  }
  const handleDelete = (userId) => {
    setDeletingUser(userId);
    setIsDeleting(true);
  }
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
  }
  return (
    <div>
      <table border="1" cellPadding="10" style={{width: "90%"}}>
        <thead>
          <tr>
            <th style={{ width: "12%" }}>Username</th>
            <th style={{ width: "5%" }}>Role</th>
            <th style={{ width: "5%" }}>Number of Stars</th>
            <th style={{ width: "38%" }}>Message</th>
            <th style={{ width: "30%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.username === "Pejman" ? "The Boss!" : user.role}</td>
              <td>{user.username === "Pejman" ? <div>&#128526;</div> : user.totalPoint}</td>
              <td>{user.message}</td>
              <td>
                {user.username === "Pejman" && !isDeleting ? <div>No Action for Pejman &#128526;</div> :
                currentUser.username === "Pejman" && !isDeleting ? <button onClick={() => handleDelete(user._id)} style={{display: "inline"}}>Delete</button> :
                user.role === "Admin" && !isDeleting ? <div>Admin &#128515;</div> :
                !isDeleting && <button onClick={() => handleDelete(user._id)} style={{display: "inline"}}>Delete</button>
              }
                {isDeleting && deletingUser === user._id &&
                  <div style={{display: "inline", marginLeft: "8px"}}>
                    {`Delete ${users.find(u => u._id === user._id).username}?`}
                    <button onClick={() => handleDeleteYes(user._id)} style={{marginLeft: "8px"}}>Yes</button>
                    <button onClick={handleDeleteNo} style={{marginLeft: "4px"}}>No</button>
                  </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!isDeleting &&
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
      }
    </div>
  );
}
