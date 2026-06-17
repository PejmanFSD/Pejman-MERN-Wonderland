export default function AboutMaze({ setIsAboutPage }) {
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
                  About Maze
                </h2>
                <h4>How to Play</h4>
                In this game, you are placed inside a maze with:
                <br />
                - A magenta circle positioned at the top-left corner.
                <br />
                - A yellow rectangle located at the bottom-right corner.
                <br />
                Your goal is to guide the magenta circle through the maze and
                reach the yellow rectangle to win the game.
                <br />
                You can move the circle using the four arrow keys on your
                keyboard.
                <br />
                <h4>Game Modes</h4>
                <strong>- Easy Mode:</strong>
                <br />
                - Maze grid size: 6 × 10
                <br />
                - No time limit
                <br />
                - Winning does not award any stars
                <br />
                <strong>- Normal Mode:</strong>
                <br />
                - Maze grid size: 21 × 35
                <br />
                - You have 180 seconds to complete the maze
                <br />- Win the game to earn 1 star
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
