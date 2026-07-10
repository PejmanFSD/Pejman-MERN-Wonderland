export default function AboutPuzzle({ setIsAboutPage }) {
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
                  About Puzzle
                </h2>
                <div>
                  In this game, you can choose from 6 different puzzles, each
                  based on an image divided into smaller pieces:
                  <br />
                  - Balloons
                  <br />
                  - Ghost
                  <br />
                  - Lion
                  <br />
                  - Mansion
                  <br />
                  - Pencils
                  <br />
                  - Numbers
                  <br />
                </div>
                <div>Each puzzle image is split into 25 small pieces.</div>
                <h4>How to Play</h4>
                <div>
                  After selecting a puzzle the 25 image pieces appear on the
                  board, there are also 5 blank spaces.
                  <br />
                  A puzzle piece can only move if it is directly next to one of
                  the blank spaces.
                  <br />
                  <br />
                  To help you:
                  <br />
                  The game displays 4 arrow buttons. Only the buttons
                  representing valid moves are enabled and invalid movement
                  directions remain disabled.
                  <br />
                  By sliding the pieces into the blank spaces, your goal is to
                  rearrange all 25 pieces into their correct positions and
                  recreate the original image.
                  <br />
                  If you successfully rebuild the picture, you win the game.
                </div>
                <h4>Game Modes</h4>
                <strong>- Easy Mode:</strong>
                <br />
                - No time limit.
                <br />
                - Win the game to earn 8 stars.
                <br />
                <strong>- Normal Mode:</strong>
                <br />
                - You have 400 seconds to solve the puzzle.
                <br />
                - Win the game to earn 12 stars.
                <br />
                <em>
                  (If you are an employer, try the “Numbers” puzzle, it is the
                  easiest one).
                </em>
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
