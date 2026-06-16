export default function GameCard({ imageSrc, title, onClickFunction }) {
  return (
    <div className="card wonderland-card" style={{ margin: "20px" }}>
      <img
        src={imageSrc}
        className="card-img-top img-fluid"
        style={{ border: "2px solid black" }}
        alt={title}
      />
      <div>
        <button className="btn" onClick={onClickFunction}>
          {title}
        </button>
      </div>
    </div>
  );
}
