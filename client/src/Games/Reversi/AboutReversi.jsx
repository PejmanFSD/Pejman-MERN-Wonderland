export default function AboutReversi({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div>
      <h2>About Reversi</h2>
      In this game, you first choose a color for yourself and a different color
      for Pejman.
      <br />
      Both players must have different colors
      <br />
      <em>
        (If you are an employer, feel free to test selecting the same color for
        both players to explore the application’s validation features and unique
        error handling).
      </em>
      <h4>How to Play</h4>
      The Game Board:
      <br />
      The game is played on a 7 × 7 board containing 49 cells.
      <br />
      Players take turns selecting cells and capturing each other’s pieces by
      changing their colors.
      <br />
      <br />
      First Move Rules:
      <br />
      The player who starts the game must place their first move within the 9
      central cells of the board.
      <br />
      If you start the game in Easy Mode and choose a cell outside the central
      area, an error message will appear.
      <br />
      <em>
        (If you are an employer, feel free to test this validation to explore
        the variety of functionalities in the application).
      </em>
      <br />
      <br />
      Movement Rules:
      <br />
      After the first move: Every new selected cell must be adjacent to at least
      one previously selected cell.
      <br />
      Selecting a cell with no neighboring selected cells is not allowed.
      <br />
      If you attempt an invalid move, an error message will appear.
      <br />
      <em>
        (If you are an employer, feel free to test this validation as well).
      </em>
      <br />
      Pejman always follows the game rules correctly during his turns.
      <br />
      <br />
      Capturing Cells:
      <br />
      Except for the very first move, selecting a cell displays 8 directional
      buttons below the board, each representing one direction:
      <br />
      ↑ ↓ ← → ↖ ↗ ↙ ↘<br />
      Some buttons may be disabled if there are no opponent cells in that
      direction.
      <br />
      When you click an active direction button, all of Pejman’s cells in that
      direction are converted to your color.
      <br />
      Pejman can also capture your cells in the same way during his turns.
      <br />
      <br />
      Important Rule:
      <br />
      If you select a valid neighboring cell but cannot capture any of Pejman’s
      cells from that move, you immediately lose the game!
      <br />
      Pejman never makes this mistake.
      <br />
      <br />
      <h4>Winning the Game</h4>
      The game continues until all 49 cells are filled. At the end, the player
      with the greater number of colored cells wins the game.
      <h4>Game Modes</h4>
      <strong>- Easy Mode:</strong>
      <br />
      - You start the game.
      <br />
      - Winning does not award any stars.
      <br />
      <strong>- Normal Mode:</strong>
      <br />
      - Pejman starts the game.
      <br />
      - Win the game to earn 3 stars.
      <br />
      <button onClick={handleGamePage}>Back to the Game</button>
    </div>
  );
}
