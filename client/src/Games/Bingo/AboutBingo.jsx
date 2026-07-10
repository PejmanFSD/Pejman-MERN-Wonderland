export default function AboutBingo({ setIsAboutPage }) {
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
                  About Bingo
                </h2>
                <div>
                  In this game, you first choose a color for your boards. Then,
                  6 boards are generated:
                  <br />
                  3 boards for you, 3 boards for Pejman.
                  <br />
                  Each board contains 25 cells (5 × 5).
                </div>
                <h4>How to Play</h4>
                <div>
                  <srtong>Board Structure:</srtong>
                  <br />
                  Every row on a board contains 5 randomly selected numbers that
                  share the same tens digit.
                  <br />
                  For example:
                  <br />
                  31, 34, 37, 39, and 36 all belong to the “30s”.
                  <br />
                  Within a single row of a board:
                  <br />
                  No two numbers are the same.
                  <br />
                  Within a single board:
                  <br />
                  No two rows share the same tens group.
                  <br />
                  However, different boards may contain rows from the same tens
                  group.
                </div>
                <h4>How the Game Works</h4>
                <div>
                  Before the game begins:
                  <br />
                  All numbers from 1 to 99 are shuffled into a hidden random
                  order, neither you nor Pejman can see the order in advance.
                  <br />
                  As the game progresses, Numbers are revealed one by one and
                  the same number never appears twice.
                  <br />
                  <br />
                  Whenever a number appears: You must check all 3 of your
                  boards, if the number exists on your board, its cell
                  automatically turns yellow.
                  <br />
                  You must click the highlighted cell before revealing the next
                  number. If you fail to click it in time, The cell becomes
                  burnt (gray) and a warning message appears indicating that you
                  missed the number
                  <br />
                  <em>
                    (If you are an employer, feel free to intentionally miss a
                    highlighted number to explore the variety of functionalities
                    in the application).
                  </em>
                  <br />
                  A number may appear on more than one of your boards at the
                  same time.
                  <br />
                  Pejman also marks numbers on his boards automatically and
                  never misses a valid number.
                </div>

                <h4>Winning the Game</h4>
                <div>
                  The game continues until a player completes:
                  <br />
                  Either a full row, or a full column or a full diagonal with 5
                  correctly selected numbers on one board.
                  <br />
                  If the completed line belongs to one of your boards, you win.
                  If it belongs to one of Pejman’s boards, Pejman wins.
                  <br />
                  Burnt cells cannot contribute to a winning line, in another
                  word, a burnt cell burns its entire row and column and if the
                  burnt cell is part of a diagonal, that diagonal becomes burnt
                  as well.
                  <br />
                  This means even one missed number can prevent a possible
                  victory.
                </div>

                <h4>Reward</h4>
                <div>Win the game to earn 3 stars.</div>
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
