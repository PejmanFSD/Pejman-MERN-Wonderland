export default function AboutNim({ setIsAboutPage }) {
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
                  About Nim
                </h2>
                <div>
                  In this game, both players have 5 bowls that must be filled
                  with balls before the match begins.
                  <br />
                  At the start of the game:
                  <br />
                  You fill each bowl with a number of balls.
                  <br />
                  Each bowl must contain at least 1 ball and at most 7 balls.
                  <br />
                  All 10 bowls (yours and Pejman’s) may contain different
                  numbers of balls.
                  <br />
                  Once the bowls are prepared, the game begins.
                </div>
                <h4>How to Play</h4>
                Players take turns removing balls from the bowls.
                <br />
                During your turn:
                <br />
                - You should choose only one bowl
                <br />
                - You can remove as many balls as you want from that bowl
                <br />
                - You must remove at least one ball
                <br />
                The game continues until all bowls are empty and no balls
                remain. Depending on the selected game format, the winner is
                determined differently.
                <h4>Game Formats</h4>
                - Standard: The player who removes the last ball wins.
                <br />- Misère: The player who removes the last ball loses.
                <h4>Game Modes</h4>
                <strong>- Easy Mode:</strong>
                <br />
                Pejman chooses bowls and removes balls randomly during his turn.
                <br />
                Win the game to earn 5 stars.
                <br />
                <strong>- Normal Mode:</strong>
                <br />
                Pejman uses a strategy to decide which bowl to choose and how
                many balls to remove.
                <br />
                Win the game to earn 28 stars.
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
