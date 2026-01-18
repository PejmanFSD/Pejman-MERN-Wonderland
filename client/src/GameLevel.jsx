export default function GameLevel({ mode1, mode1Function, mode2, mode2Function }) {
  return (
    <div>
      <button onClick={() => mode1Function()}>{mode1}</button>
      <button onClick={() => mode2Function()}>{mode2}</button>
    </div>
  );
}
