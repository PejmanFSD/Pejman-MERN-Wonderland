export default function AboutRockScissorsPaper({ setIsAboutPage }) {
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
                  About Rock, Scissors, Paper
                </h2>
                <h4>How to Play</h4>
                Both you and Pejman can choose one of the following:
                <br />
                - Rock
                <br />
                - Scissors
                <br />
                - Paper
                <br />
                <h4>Rules</h4>
                - Rock beats Scissors
                <br />
                - Scissors beats Paper
                <br />
                - Paper beats Rock
                <br />
                - If both players choose the same option, the round ends in a
                draw
                <br />
                <h4>Game Modes</h4>
                <div>
                  <strong>- Normal Mode:</strong>
                  <br />
                  Defeat Pejman 3 times in a row to earn 1 star.
                </div>
                <div>
                  <strong>- Extremely-Super-Difficult Mode:</strong>
                  <br />
                  Beat Pejman just once to earn an incredible 1,000,000 stars!
                </div>
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
