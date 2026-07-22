export default function AboutCapitals({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div className="container mt-3 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="cause" style={{ fontSize: "15px" }}>
            <div className="card">
              <div className="card-body m-3">
                <h2 className="fasterOne" style={{ fontSize: "40px" }}>
                  About Capitals
                </h2>
                <h4>How to Play</h4>
                <div>
                  In this game, 7 countries are randomly selected from around
                  the world, and your challenge is to correctly guess the
                  capital city of each one.
                  <br />
                  Once the game ends, you will see which of your answers were
                  correct and which were incorrect.
                  <br />
                  Each country must have a selected answer before submission —
                  leaving any dropdown unselected is not allowed.
                  <br />
                  <em>
                    (If you are an employer, feel free to test this validation
                    to explore the variety of functionalities in the
                    application).
                  </em>
                </div>
                <h4>Game Modes</h4>
                <strong>- Easy Mode:</strong>
                <br />
                No time limit (Great for practice and learning).
                <br />
                Winning does not award any stars.
                <br />
                <strong>- Normal Mode:</strong>
                <br />
                You have 45 seconds to guess all capitals.
                <br />
                Win the game to earn 12 stars.
                <h4>Please rate the game and leave a comment 🙂 </h4>
                <button className="btn1" onClick={handleGamePage}>
                  Back to the Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
