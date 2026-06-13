export default function ConfirmationBox({
  question,
  toggleYes,
  toggleCancel,
}) {
  return (
    <div>
      <div>{question}</div>
    <div className="four-buttons-container">
      <button onClick={() => toggleYes()}>Yes</button>
      <button onClick={() => toggleCancel()}>Cancel</button>
    </div>
    </div>
  );
}
