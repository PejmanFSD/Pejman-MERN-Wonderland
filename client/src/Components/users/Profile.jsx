export default function Profile({ currentUser }) {
  return (
    <div>
      {currentUser && (
        <div>
          <div>Username: {currentUser.username}</div>
          <div>Role: {currentUser.role}</div>
          <div>Message: {currentUser.message}</div>
          <div>Number of stars: {currentUser.totalPoint}</div>
        </div>
      )}
    </div>
  );
}
