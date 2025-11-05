export default function GameLevel({ runNormalMode, runExtremelySuperDifficultMode }) {
  return (
    <div>
      <button onClick={() => runNormalMode()}>Normal</button>
      <button onClick={() => runExtremelySuperDifficultMode()}>Extremely Super Difficult</button>
    </div>
  );
}
