export default function AboutKukuKube({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div>
      <h2>About Kuku Kube</h2>
      <h4>How to Play</h4>
      <div>
        In this game, you first choose your preferred color: Blue, Red or Green
        <br />
        A board of colored squares will then appear using your selected color.
        <br />
        Among all the squares, one has a slightly different opacity, making it a
        little lighter than the others.
        <br />
        Your challenge is to quickly identify and click the square with the
        different shade to move to the next step.
      </div>
      <div>
        As you progress through the game:
        <br />
        -The difference in opacity becomes smaller.
        <br />
        -The lighter square becomes harder to spot.
        <br />
        -The challenge increases with every step.
        <br />
        The game contains 12 steps in total, If you successfully complete all 12
        steps, you win the game and if you click the wrong square at any step,
        you lose the game.
        <br />
        Below the main board, there are 12 progress squares that display your
        current progress:
        <br />
        🟨 Yellow indicates the current step
        <br />
        🟩 Green indicates completed steps
        <br />⬜ Blank squares represent upcoming steps
      </div>
      <h4>Game Modes</h4>
      <strong>- Easy Mode:</strong>
      <br />
      - Each board contains 9 squares (3 × 3).
      <br />
      - Winning does not award any stars.
      <br />
      <strong>- Normal Mode:</strong>
      <br />
      - Each board contains 36 squares (6 × 6).
      <br />
      - Win the game to earn 1 star.
      <h4>Please rate the game and leave a comment 🙂 </h4>
      <button onClick={handleGamePage}>Back to the Game</button>
    </div>
  );
}
