export default function AboutRockScissorsPaper({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div>
      <h2>About Rock, Scissors, Paper</h2>
      <h4>How to Play</h4>
      Both you and Pejman can choose one of the following: - Rock
      <br />
      - Scissors
      <br />
      - Paper
      <br />
      <h4>Rules</h4>
      - Rock beats Scissors
      <br />
      - Scissors beats Paper
      <br />
      - Paper beats Rock
      <br />
      - If both players choose the same option, the round ends in a draw
      <br />
      <h4>Game Modes</h4>
      <div>
        <strong>- Normal Mode:</strong>
        <br />
        Defeat Pejman 3 times in a row to earn 1 star.
      </div>
      <div>
        <strong>- Extremely-Super-Difficult Mode:</strong>
        <br />
        Beat Pejman just once to earn an incredible 1,000,000 stars!
      </div>
      <button onClick={handleGamePage}>Back to the Game</button>
    </div>
  );
}
