import "../../App.css";
import { useState, useEffect } from "react";
import User from "./User";

export default function Users({ users, setUsers }) {
  //   const [idx, setIdx] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/users?page=${page}`, { // `/users?page=${page}` is the new path for pagination.
          // Before pagination it was "users"
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log("DATA FROM SERVER:", data);
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUsers(); // Refetching when "page" changes
  }, [page]);
  if (!users || users.length === 0) {
    return <p>No users available</p>;
  }
  const handleDelete = async (userId) => {
    await fetch(`/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });
    // Removing the user from the state variable:
    setUsers((currUsers) => currUsers.filter((u) => u._id !== userId));
  };
  return (
    <div>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Username</th>
            <th style={{ width: "5%" }}>Role</th>
            <th style={{ width: "10%" }}>Number of Stars</th>
            <th style={{ width: "60%" }}>Message</th>
            <th style={{ width: "6%" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.totalPoint}</td>
              <td>{user.message}</td>
              <td>
                {user.role !== "Admin" ? <button onClick={() => handleDelete(user._id)}>Delete</button> : <div>Admin &#128526;</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
}
