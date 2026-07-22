export default function AboutCounter({ setIsAboutPage }) {
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
                  About Counter
                </h2>
                <h4>How to play</h4>
                <div>
                  In this game, you will first watch a short movie showing a
                  sequence of different objects.
                  <br />
                  Here’s how it works:
                  <br />
                  Each object appears on the screen for 1 second, after each
                  object, the screen becomes empty for 1 second, then the next
                  object appears.
                  <br />
                  Some objects may appear multiple times throughout the movie.
                  <br />
                  Your Challenge:
                  <br />
                  Once the movie ends, 3 objects from the movie are randomly
                  selected.
                  <br />
                  Your task is to guess how many times each object appeared.
                  <br />
                  The repetition count for every object will always be: 1, 2 or
                  3.
                  <br />
                  If you correctly guess the repetition count for all 3 selected
                  objects, you win the game.
                </div>
                <h4>Game Modes</h4>
                <strong>- Easy Mode:</strong>
                <br />
                - The movie contains 5 objects.
                <br />
                - Win the game to earn 10 stars.
                <br />
                <strong>- Normal Mode:</strong>
                <br />
                - The movie contains 16 objects.
                <br />- Win the game to earn 25 stars.
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
