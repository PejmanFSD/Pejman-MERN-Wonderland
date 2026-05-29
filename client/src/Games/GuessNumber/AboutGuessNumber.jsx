export default function AboutGuessNumber({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div>
      <h2>About Guess Number</h2>
      <h4>How to Play</h4>
      <div>
        In this game, a hidden 4-digit number is generated for you, and your
        goal is to guess it correctly.<br />
        Since the number is hidden, you must
        enter your guess using four separate input boxes (one digit per box).
        <br />
        After submitting your guess, you will receive feedback in the form of 4
        colored circles:
      </div>
      <ul>
        <li>🟢 Green: The digit exists and is in the correct position.</li>
        <li>🟡 Yellow: The digit exists, but it is in the wrong position.</li>
        <li>🔴 Red: The digit does not exist in the number.</li>
      </ul>
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
        Your first digit exists in the number, but not in the first position.
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
        Example: If the second circle is yellow, it means one of your digits
        exists in the number, but is placed incorrectly.
      </div>
      <h4>Input Rules</h4>
      Each digit must follow these rules:
      <br />
      <ul>
        <li>The first digit cannot be 0</li>
        <li>Digits must be between 0 and 9</li>
        <li>Negative numbers are not allowed</li>
        <li>Decimal numbers are not allowed</li>
        <li>Repeated digits are not allowed</li>
        <li>Obviously, non-digit characters (like the letters of the alphabet) are not allowed</li>
      </ul>
        <div>
          Each rule has its own unique error message. <em>(If you are an employer,
          feel free to test the different vadivdation errors to explore the
          variety of functionalities in the application)</em>.
        </div>
      <button onClick={handleGamePage}>Back to the Game</button>
    </div>
  );
}
