export default function AboutRockScissorsPaper({setIsAboutPage}) {
    const handleGamePage = () => {
        setIsAboutPage(false)
    }
  return (
    <div>
      <h2>About Rock, Scissors, Paper</h2>
      <h4>How to Play</h4>
      Both you and Pejman can choose one of the following:
      <ul>
        <li>Rock</li>
        <li>Scissors</li>
        <li>Paper</li>
      </ul>
      <h4>Rules</h4>
      <ul>
        <li>Rock beats Scissors</li>
        <li>Scissors beats Paper</li>
        <li>Paper beats Rock</li>
        <li>
          If both players choose the same option, the round ends in a draw
        </li>
      </ul>
      <h4>Game Modes</h4>
      <div>
      - Normal Mode: Defeat Pejman 3 times in a row to earn 1 star.
      </div>
      <div>
      - Extremely-Super-Difficult Mode: Beat Pejman just once to earn an
      incredible 1,000,000 stars!
      </div>
      <button onClick={handleGamePage}>Back to the Game</button>
    </div>
  );
}
