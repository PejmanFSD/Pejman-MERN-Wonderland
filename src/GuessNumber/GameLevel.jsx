export default function GameLevel({ runEasyMode, runNormalMode }) {
  return (
    <div>
      <button onClick={() => runEasyMode()}>Easy</button>
      <button onClick={() => runNormalMode()}>Normal</button>
    </div>
  );
}
