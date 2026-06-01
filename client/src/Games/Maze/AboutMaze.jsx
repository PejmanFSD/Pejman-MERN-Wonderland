export default function AboutMaze({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div>
      <h2>About Maze</h2>
      <h4>How to Play</h4>
      In this game, you are placed inside a maze with:
      <br />
      - A magenta circle positioned at the top-left corner.
      <br />
      - A yellow rectangle located at the bottom-right corner.
      <br />
      Your goal is to guide the magenta circle through the maze and reach the
      yellow rectangle to win the game.
      <br />
      You can move the circle using the four arrow keys on your keyboard.
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
      - You have 140 seconds to complete the maze
      <br />
      - Win the game to earn 1 star
      <br />
      <button onClick={handleGamePage}>Back to the Game</button>
    </div>
  );
}
