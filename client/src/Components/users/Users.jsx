import "../../App.css";
import { useState, useEffect } from "react";
import User from "./User";

export default function Users({ users, setUsers }) {
  //   const [idx, setIdx] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log("DATA FROM SERVER:", data);
        setUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUsers();
  }, []);
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
            <th>Role</th>
            <th>Total Points</th>
            <th>Message</th>
            <th>Actions</th>
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
                <button onClick={() => handleDelete(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
