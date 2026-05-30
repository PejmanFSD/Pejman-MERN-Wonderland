export default function AboutCryptogram({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div>
      <h2>About Cryptogram</h2>
      <h4>How to Play</h4>
      <div>
        In this game, a random piece of advice is selected for you. Within the
        advice, 4 different letters of the alphabet are hidden — regardless of
        how many times each letter appears in the text.
        <br />
        Each hidden letter is replaced with an input box containing a unique
        code. Input boxes that share the same code represent the same letter.
        Your task is to figure out the correct letters and fill in all the input
        boxes.
        <br />
        <strong>Helpful Feature:</strong>
        <br />
        When you type a letter into an input box, every other input box with the
        same code will automatically be filled with that same letter.
        <br />
        Once all inputs are completed, If every hidden letter is guessed
        correctly, you win the game.
        <br />
        Winning the game rewards you with 1 star.
        <br />
        <h4>Input Rules</h4>
        <ul>
          <li>No input box can be left empty.</li>
          <li>Different codes cannot contain the same letter.</li>
          <li>
            The game guarantees that the hidden letters do not already appear
            visibly in the advice before submission. If you enter a letter that
            is already visible elsewhere in the advice, you will receive a
            warning. However, you may still submit your answer — though doing so
            will result in losing the game.
          </li>
        </ul>
        <em>
          (If you are an employer, feel free to test the different validation
          errors to explore the variety of functionalities in the application).
        </em>
      </div>
      <button onClick={handleGamePage}>Back to the Game</button>
    </div>
  );
}
