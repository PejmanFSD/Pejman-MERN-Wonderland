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
  //   const handleNext = () => {
  //     setIdx((currUser) =>
  //       currUser === users.length - 1 ? 0 : currUser + 1
  //     );
  //   };
  //   const handlePrevious = () => {
  //     setIdx((currUser) =>
  //       currUser === 0 ? users.length - 1 : currUser - 1
  //     );
  //   };
  //   const currentAd = users[idx];
  return (
    <div>
      {users.map((user) => (
        <User
          userUsernam={user.username}
          userRole={user.role}
          userTotalPoint={user.totalPoint}
          userMessage={user.message}
        />
      ))}
      {/* <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrevious}>Previous Ad</button>
        <button onClick={handleNext}>Next Ad</button>
      </div> */}
    </div>
  );
}
