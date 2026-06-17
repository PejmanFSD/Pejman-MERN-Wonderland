export default function ConfirmationBox({ question, toggleYes, toggleCancel }) {
  return (
    <div>
      <div>{question}</div>
      <div style={{marginTop: "10px"}}>
        <button className="btn2 mx-1" onClick={() => toggleYes()}>Yes</button>
        <button className="btn2 mx-1" style={{width: "70px"}} onClick={() => toggleCancel()}>Cancel</button>
      </div>
    </div>
  );
}
