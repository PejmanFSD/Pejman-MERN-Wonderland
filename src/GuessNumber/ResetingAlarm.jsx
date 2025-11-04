export default function ResetingAlarm({ toggleResetYes, toggleResetCancel }) {
  return (
    <div>
      <div>Are you sure you want to reset the game?</div>
      <button onClick={() => toggleResetYes()}>Yes</button>
      <button onClick={() => toggleResetCancel()}>Cancel</button>
    </div>
  );
}
