export default function AboutCapitals({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div>
      <h2>About Capitals</h2>
      <h4>How to Play</h4>
      <div>
        In this game, 7 countries are randomly selected from around the world,
        and your challenge is to correctly guess the capital city of each one.
        <br />
        Once the game ends, you will see which of your answers were correct and
        which were incorrect.
        <br />
        Each country must have a selected answer before submission — leaving any
        dropdown unselected is not allowed.
        <br />
        <em>
          (If you are an employer, feel free to test this validation to explore
          the variety of functionalities in the application).
        </em>
      </div>
      <h4>Game Modes</h4>
      <strong>- Easy Mode:</strong>
      <br />
      No time limit (Great for practice and learning).
      <br />
      Winning does not award any stars.
      <br />
      <strong>- Normal Mode:</strong>
      <br />
      You have 45 seconds to guess all capitals.
      <br />
      Win the game to earn 3 stars.
      <br />
      <button onClick={handleGamePage}>Back to the Game</button>
    </div>
  );
}
