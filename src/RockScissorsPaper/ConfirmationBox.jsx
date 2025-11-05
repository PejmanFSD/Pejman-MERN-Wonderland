export default function ConfirmationBox({
  areYouSureQuestion,
  toggleYes,
  toggleCancel,
}) {
  return (
    <div>
      <div>{areYouSureQuestion}</div>
      <button onClick={() => toggleYes()}>Yes</button>
      <button onClick={() => toggleCancel()}>Cancel</button>
    </div>
  );
}
