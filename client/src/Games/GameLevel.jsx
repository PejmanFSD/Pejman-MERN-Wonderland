export default function GameLevel({ mode1, mode1Function, mode2, mode2Function }) {
  return (
    <div className="four-buttons-container">
      <button className="btn1 mx-1 my-2" onClick={() => mode1Function()}>{mode1}</button>
      <button className="btn1 mx-1 my-2" onClick={() => mode2Function()}>{mode2}</button>
    </div>
  );
}
