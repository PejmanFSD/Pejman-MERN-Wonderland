export default function AboutCryptogram({ setIsAboutPage }) {
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
                  About Cryptogram
                </h2>
                <h4>How to Play</h4>
                In this game, a random piece of advice is selected for you.
                Within the advice, 4 different letters of the alphabet are
                hidden — regardless of how many times each letter appears in the
                text.
                <br />
                Each hidden letter is replaced with an input box containing a
                unique code. Input boxes that share the same code represent the
                same letter. Your task is to figure out the correct letters and
                fill in all the input boxes.
                <br />
                <strong>Helpful Feature:</strong>
                <br />
                When you type a letter into an input box, every other input box
                with the same code will automatically be filled with that same
                letter.
                <br />
                Once all inputs are completed, If every hidden letter is guessed
                correctly, you win the game.
                <br />
                Winning the game rewards you with 2 stars.
                <br />
                <h4>Input Rules</h4>
                - No input box can be left empty.
                <br />
                - Different codes cannot contain the same letter.
                <br />
                - The game guarantees that the hidden letters do not already
                appear visibly in the advice before submission.
                <br />
                If you enter a letter that is already visible elsewhere in the
                advice, you will receive a warning.
                <br />
                However, you may still submit your answer — though doing so will
                result in losing the game.
                <br />
                <em>
                  (If you are an employer, feel free to test the different
                  validation errors to explore the variety of functionalities in
                  the application).
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
