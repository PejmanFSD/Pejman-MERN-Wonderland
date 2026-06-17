export default function AboutHappyFlower({ setIsAboutPage }) {
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
                  About Happy Flower
                </h2>
                <div>
                  In this game, you begin by choosing one of the following
                  categories:
                </div>
                - Animal
                <br />
                - Color
                <br />
                - Car
                <br />
                - Job
                <br />
                - Book
                <br />
                - Country
                <br />
                - City
                <br />
                <div>
                  After selecting a category, the game chooses a hidden word
                  related to that category.
                  <br />
                  Each letter of the word is represented by an empty box on the
                  screen.
                  <br />
                  You will also see:
                  <br />
                  - A keyboard for guessing letters
                  <br />
                  - 5 boxes reserved for incorrect guesses
                  <br />
                  - A happy flower with 5 petals
                  <br />
                </div>
                <h4>How to Play</h4>
                <div>
                  Guess the letters of the hidden word one by one using the
                  on-screen keyboard.
                  <br />
                  If your guessed letter exists in the word, it will be revealed
                  in the correct box(es).
                  <br />
                  If the letter does not exist in the word:
                  <br />
                  - One incorrect-guess box will be filled
                  <br />
                  - One petal of the flower will fall
                  <br />
                  Each wrong guess makes the flower a little less happy.
                  <br />
                  To win the game, you must reveal the entire word before making
                  5 incorrect guesses.
                  <br />
                  If all 5 wrong-guess boxes are filled (causing all flower
                  petals to fall) you lose the game.
                </div>
                <h4>Game Modes</h4>
                <strong>- Easy Mode:</strong>
                <br />
                - No time limit.
                <br />
                - Win the game to earn 1 star.
                <br />
                <strong>- Normal Mode:</strong>
                <br />
                - You have 60 seconds to guess the word.
                <br />- Win the game to earn 3 stars.
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
