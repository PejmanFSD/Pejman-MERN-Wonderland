export default function AboutPuzzle({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div>
      <h2>About Puzzle</h2>
      <div>
        In this game, you can choose from 6 different puzzles, each based on an
        image divided into smaller pieces:
      </div>
      <ul>
        <li>Balloons</li>
        <li>Ghost</li>
        <li>Lion</li>
        <li>Mansion</li>
        <li>Pencils</li>
        <li>Numbers</li>
      </ul>
      <div>Each puzzle image is split into 25 small pieces.</div>
      <h4>How to Play</h4>
      <div>
        After selecting a puzzle the 25 image pieces appear on the board, there
        are also 5 blank spaces.
        <br />
        A puzzle piece can only move if it is directly next to one of the blank
        spaces.
        <br />
        <br />
        To help you:
        <br />
        The game displays 4 arrow buttons. Only the buttons representing valid
        moves are enabled and invalid movement directions remain disabled.
        <br />
        By sliding the pieces into the blank spaces, your goal is to rearrange
        all 25 pieces into their correct positions and recreate the original
        image.
        <br />
        If you successfully rebuild the picture, you win the game.
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
      - You have 400 seconds to solve the puzzle.
      <br />
      - Win the game to earn 4 stars.
      <br />
      <em>
        (If you are an employer, try the “Numbers” puzzle, it is the easiest
        one).
      </em>
      <br />
      <button onClick={handleGamePage}>Back to the Game</button>
    </div>
  );
}
