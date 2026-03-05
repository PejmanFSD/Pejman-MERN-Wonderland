export default function User({
  userUsernam,
  userRole,
  userTotalPoint,
  userMessage
}) {
  return (
    <div>
      <div>Username: {userUsernam}</div>
      <div>Role: {userRole}</div>
      <div>Total Point: {userTotalPoint}</div>
      <div>Message: {userMessage}</div>
    </div>
  );
}
