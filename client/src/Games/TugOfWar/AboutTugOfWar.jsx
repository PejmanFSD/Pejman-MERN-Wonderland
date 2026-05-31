export default function AboutTugOfWar({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div>
      <h2>About Tug of War</h2>
      <div>
        In this game, you first choose your team color: Blue or Red.
        <br />
        The remaining color automatically becomes Pejman’s team color.
      </div>
      <h4>How to Play</h4>
      <div>
        The game consists of 3 separate matches. In each match, One player
        represents you and one player represents Pejman.
        <br />
        Your player uses your chosen color, while Pejman’s player uses the
        opposite color.
        <br />
        <br />
        During each turn:
        <br />
        A dice is rolled and based on the result, you choose which of your 3
        players should act.
        <br />
        You can change your selected match at any time, but you must first
        deselect the currently selected one before choosing another.
        <br />
        <em>
          (If you are an employer and wondering why radio buttons were not
          used... the goal was to create a more challenging implementation and
          explore additional functionalities).
        </em>
        <br />
        <br />
        Objective:
        <br />
        Each match features a rope with a marker tied at its center. The goal is
        to pull the marker completely toward your side of the rope.
        <br />
        Winning a match earns you 1 victory and the first player to win 2 out of
        the 3 matches wins the game.
      </div>
      <h4>Game Modes</h4>
      <strong>- Easy Mode:</strong>
      <br />
      Pejman chooses his players randomly.
      <br />
      Winning does not award any stars.
      <br />
      <strong>- Normal Mode:</strong>
      <br />
      Pejman uses a strategy to decide which player should act.
      <br />
      Win the game to earn 1 star.
      <br />
      <button onClick={handleGamePage}>Back to the Game</button>
    </div>
  );
}
