export default function AboutXO({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div>
      <h2>About XO</h2>
      <div>
        In this game, you first choose your mark: "X" or "O".
        <br />
        The game is played on a 5 × 5 board containing 25 squares.
      </div>
      <h4>How to Play</h4>
      <div>
        Players take turns placing their marks on empty squares.
        <br />
        Whenever a player creates 3 matching marks in a row (horizontally,
        vertically, or diagonally) they earn 1 point.
        <br />
        The game continues until all 25 squares on the board are filled.
        <br />
        At the end of the game, the player with the higher score wins.
        <br />
        You can also view every successful 3-mark combination that earned points
        for each player below the main board.
      </div>
      <h4>Game Modes</h4>
      <strong>- Easy Mode:</strong>
      <br />
      - You start the game.
      <br />
      - Pejman chooses his moves randomly.
      <br />
      - Winning does not award any stars.
      <br />
      <strong>- Normal Mode:</strong>
      <br />
      - Pejman starts the game.
      <br />
      - Pejman uses a strategy to choose his moves.
      <br />
      - Win the game to earn 1 star.
      <h4>Please rate the game and leave a comment 🙂 </h4>
      <button onClick={handleGamePage}>Back to the Game</button>
    </div>
  );
}
