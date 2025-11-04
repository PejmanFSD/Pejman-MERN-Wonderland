export default function SwitchingAlarm({
  toggleLevelYes,
  toggleLevelCancel,
  easyMode,
}) {
  return (
    <div>
      <div>{`Are you sure you want to switch to ${
        easyMode ? "Normal Mode" : "Easy Mode"
      }?`}</div>
      <button onClick={() => toggleLevelYes()}>Yes</button>
      <button onClick={() => toggleLevelCancel()}>Cancel</button>
    </div>
  );
}
