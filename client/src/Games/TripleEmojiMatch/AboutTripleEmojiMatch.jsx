export default function AboutTripleEmojiMatch({ setIsAboutPage }) {
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
                  About Triple Emoji Match
                </h2>
                <div>
                  In this game, the board contains 210 emoji tiles made up of 70
                  different emojis, with each emoji appearing 3 times.
                  <br />
                  Above the board, there are 7 slots available for collected
                  emojis (The last slot acts as the dead spot).
                </div>
                <h4>How to Play</h4>
                <div>
                  Click on any emoji tile to pick it up, the selected emoji is
                  removed from the board and it is then placed into one of the
                  slots above the board.
                  <br />
                  Your goal is to create groups of 3 identical emojis in the
                  slots.
                  <br />
                  When 3 matching emojis are collected:
                  <br />
                  - They automatically disappear from the slots.
                  <br />- They are permanently removed from the game.
                </div>
                <h4>Winning & Losing</h4>
                You Win If you successfully remove all 210 emojis from both the
                board and the slots.
                <br />
                You Lose If all 7 slots become filled without forming a set of 3
                matching emojis.
                <h4>Game Modes</h4>
                <strong>- Easy Mode:</strong>
                <br />
                - No time limit.
                <br />
                - Win the game to earn 10 stars.
                <br />
                <strong>- Normal Mode:</strong>
                <br />
                - You have 720 seconds to clear all emojis.
                <br />- Win the game to earn 20 stars.
                <h4>Help Buttons</h4>
                The game also includes helpful features to assist you during
                gameplay.
                <br />
                - Extra Time: Adds 30 minutes to your timer (Not available in
                Easy Mode).
                <br />- Matching Emoji Finder: These buttons reveal a complete
                triple match to help you progress through the game.
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
