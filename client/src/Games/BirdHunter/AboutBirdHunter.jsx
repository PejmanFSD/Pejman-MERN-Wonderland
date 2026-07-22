export default function AboutBirdHunter({ setIsAboutPage }) {
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
                  About Bird Hunter
                </h2>
                In this game, there are 16 different landscapes, each containing
                one tree on the left and one tree on the right.
                <br />
                In every landscape, a bird flies from the left tree toward the
                right tree, and your goal is to shoot the bird by clicking on it
                before it reaches its destination.
                <br />
                <h4>How the Game Works</h4>
                Only one bird appears on the screen at a time. A new bird begins
                flying only after:
                <br />
                The previous bird has been shot, or
                <br />
                The previous bird successfully reaches the right tree
                <br />
                If a bird reaches the right tree before you click on it, you
                miss that bird and it can no longer be shot.
                <br />
                The landscapes appear in a random order, not sequentially and
                each landscape contains only one bird flight during the entire
                game.
                <br />
                As the game progresses, each new bird flies slightly faster than
                the previous one so the challenge becomes more difficult over
                time.
                <h4>Winning the Game</h4>
                The game ends after all 16 landscapes have featured a bird
                flight and to win you must successfully shoot at least 14 birds.
                <br />
                Win the game to earn 5 stars.
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
