export default function AboutPidoku({ setIsAboutPage }) {
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
                  About Pidoku
                </h2>
                <div>
                  In this game, you first choose a color for yourself and a
                  different color for Pejman.
                  <br />
                  Both players must have different colors.
                  <br />
                  <em>
                    (If you are an employer, feel free to test selecting the
                    same color for both players to explore the application's
                    validation features and unique error handling).
                  </em>
                </div>
                <h4>How to Play</h4>
                The game is played on a 5 × 5 board containing 25 cells. Players
                take turns selecting cells on the board.
                <br />
                Each selected cell changes to the player’s chosen color and a
                number also appears inside the cell;
                <br />
                This number represents the order of the player's moves:
                <br />
                First move → 1<br />
                Second move → 2<br />
                Third move → 3<br />
                And so on
                <br />
                Each player selects 12 cells, meaning 24 cells in total will
                eventually be filled.
                <br />
                At that point, one cell remains empty. This cell is called the
                decisive cell.
                <h4>Scoring System</h4>
                The numbers inside the cells surrounding the decisive cell are
                used to calculate the final scores:
                <br />
                - The sum of the numbers in your colored cells becomes your
                total score.
                <br />
                - The sum of the numbers in Pejman’s colored cells becomes his
                total score.
                <br />
                The player with the higher total score wins the game.
                <h4>Game Modes</h4>
                <strong>- Easy Mode:</strong>
                <br />
                - Pejman selects cells randomly during his turn.
                <br />
                - Winning does not award any stars.
                <br />
                <strong>- Normal Mode:</strong>
                <br />
                - Pejman uses a strategy to choose his moves.
                <br />- Win the game to earn 1 star.
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
