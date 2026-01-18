export default function ConfirmationBox({
  question,
  toggleYes,
  toggleCancel,
}) {
  return (
    <div>
      <div>{question}</div>
      <button onClick={() => toggleYes()}>Yes</button>
      <button onClick={() => toggleCancel()}>Cancel</button>
    </div>
  );
}
