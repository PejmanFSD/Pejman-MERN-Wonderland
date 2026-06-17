export default function AboutGuessNumber({ setIsAboutPage }) {
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
                  About Guess Number
                </h2>
                <h4>How to Play</h4>
                <div>
                  In this game, a hidden 4-digit number is generated for you,
                  and your goal is to guess it correctly.
                  <br />
                  Since the number is hidden, you must enter your guess using
                  four separate input boxes (one digit per box).
                  <br />
                  After submitting your guess, you will receive feedback in the
                  form of 4 colored circles:
                </div>
                - 🟢 Green: The digit exists and is in the correct position.
                <br />
                - 🟡 Yellow: The digit exists, but it is in the wrong position.
                <br />
                - 🔴 Red: The digit does not exist in the number.
                <br />
                <h4>Game Modes</h4>
                <div>
                  <strong>- Easy Mode:</strong>
                  <br />
                  You have 5 chances to guess the number.
                  <br />
                  If you guess correctly, you earn 1 star.
                  <br />
                  The feedback circles appear in the same order as your digits.
                  <br />
                  Example: If the circles appear as 🟡 🔴 🟢 🔴 <br />
                  It means:
                  <br />
                  Your first digit exists in the number, but not in the first
                  position.
                  <br />
                  Your second and fourth digits do not exist in the number.
                  <br />
                  Your third digit is correct and in the correct position.
                  <br />
                </div>
                <div>
                  <strong>- Normal Mode:</strong>
                  <br />
                  You have 10 chances to guess the number.
                  <br />
                  If you guess correctly, you earn 5 stars.
                  <br />
                  The feedback circles are sorted by color:
                  <br />
                  🟢 Green circles appear first
                  <br />
                  🟡 Yellow circles appear second
                  <br />
                  🔴 Red circles appear last
                  <br />
                  Example: If the second circle is yellow, it means one of your
                  digits exists in the number, but is placed incorrectly.
                </div>
                <h4>Input Rules</h4>
                <div>
                  Each digit must follow these rules:
                  <br />
                  - The first digit cannot be 0<br />
                  - Digits must be between 0 and 9<br />
                  - Negative numbers are not allowed
                  <br />
                  - Decimal numbers are not allowed
                  <br />
                  - Repeated digits are not allowed
                  <br />- Obviously, non-digit characters (like the letters of
                  the alphabet) are not allowed
                </div>
                <div>
                  Each rule has its own unique error message.{" "}
                  <em>
                    (If you are an employer, feel free to test the different
                    vadivdation errors to explore the variety of functionalities
                    in the application)
                  </em>
                  .
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
