export default function GameCard({ imageSrc, title, onClickFunction }) {
  return (
    <div className="card wonderland-card my-3 mx-2">
      <img
        src={imageSrc}
        className="card-img-top img-fluid"
        style={{ border: "2px solid black" }}
        alt={title}
        onClick={onClickFunction}
      />
      <div>
        <button className="btn" onClick={onClickFunction}>
          {title}
        </button>
      </div>
    </div>
  );
}
