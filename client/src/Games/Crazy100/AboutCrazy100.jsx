export default function AboutCrazy100({ setIsAboutPage }) {
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
                  About Crazy-100
                </h2>
                <h4>How to Play</h4>
                In this game, 16 numbers are randomly generated for you.
                <br />
                Your challenge is to select exactly 4 numbers whose total sum
                equals 100.
                <br />
                To play:
                <br />
                Click a number to select it.
                <br />
                Click a selected number again to deselect it.
                <br />
                <h4>Game Modes</h4>
                <strong>- Easy Mode:</strong>
                <br />
                No time limit (Perfect for practice and learning).
                <br />
                Winning does not award any stars.
                <br />
                <strong>- Normal Mode:</strong>
                <br />
                You have 120 seconds to find the correct 4 numbers.
                <br />
                Win the game to earn 2 stars.
                <br />
                <strong>Important Rule</strong>
                <br />
                <div>
                  You must select exactly 4 numbers, no more and no less.
                </div>
                <em>
                  (If you are an employer, feel free to test the validation by
                  selecting more or fewer than 4 numbers to explore the variety
                  of functionalities in the application).
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
