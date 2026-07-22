export default function AboutSnake({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div className="container mt-3 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="cause" style={{ fontSize: "15px" }}>
            <div className="card">
              <div className="card-body m-3">
                <h2 className="fasterOne" style={{ fontSize: "40px" }}>
                  About Snake
                </h2>
                In this game, you control a snake moving across a board made up
                of 400 grids (20 × 20) using the arrow keys on your keyboard or the ones below the board.
                <br />
                At the beginning of the game the snake consists of a single
                green square and a randomly generated red food appears somewhere
                on the board.
                <br />
                Your goal is to guide the snake toward the food.
                <br />
                <h4>How the Game Works</h4>
                When the snake’s head reaches the red food, the snake grows by
                one grid and at the same time a new food is immediately
                generated at a random location.
                <br />
                As you continue collecting food, The snake becomes longer and
                the game becomes more challenging.
                <br />
                <h4>Winning & Losing</h4>
                You Lose if the snake’s head hits a wall or collides with its
                own body.
                <br />
                When this happens, the snake turns gray.
                <br />
                You Win if you successfully collect 40 foods without crashing.
                <br />
                When you win, the snake turns yellow.
                <br />
                <h4>Pause Feature</h4>
                You can pause and resume the game at any time by pressing the
                Space key on your keyboard.
                <br />
                ⚠️ Be careful! Don't press the Space key before the game starts!
                <h4>Game Modes</h4>
                <strong>- Easy Mode:</strong>
                <br />
                - The snake’s speed remains constant
                <br />
                - Win the game to earn 3 stars
                <br />
                <strong>- Normal Mode:</strong>
                <br />
                - The snake becomes faster after each food collected
                <br />- Win the game to earn 12 stars
                <h4>Please rate the game and leave a comment 🙂 </h4>
                <button className="btn1" onClick={handleGamePage}>
                  Back to the Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
