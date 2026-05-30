export default function AboutMemoryCards({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div>
      <h2>About Memory Cards</h2>
      <h4>How to Play</h4>
      <div>
        In this game, a set of cards is placed face down. Click on a card to
        reveal its picture and try to find its matching pair.
        <br />
        You can reveal up to 2 cards at a time:
        <br />
        If the two revealed cards match, they are marked as completed.
        <br />
        If they do not match, they are hidden again.
        <br />
        Match all the cards to win the game.
      </div>
      <h4>Picture Categories</h4>
      <div>
        You can choose from several fun categories for the card images:
        <ul>
          <li>Animals</li>
          <li>Fruits</li>
          <li>Cars</li>
          <li>Emojis</li>
          <li>Movie Characters</li>
          <li>Animation Characters</li>
        </ul>
      </div>
      <h4>Game Modes</h4>
      <strong>- Easy Mode:</strong>
      <br />
      16 cards
      <br />
      No time limit
      <br />
      Winning does not award any stars
      <br />
      <strong>- Normal Mode:</strong>
      <br />
      64 cards
      <br />
      You have 180 seconds to match all cards
      <br />
      Win the game to earn 2 stars
      <br />
      <strong>- Hard Mode:</strong>
      <br />
      100 cards
      <br />
      You have 270 seconds to match all cards
      <br />
      Win the game to earn 5 stars
      <br />
      <h4>Help Buttons</h4>
      The game also includes several helpful features:
      <br />
      - Extra Time
      <br />
      Adds 15 seconds to your timer (Not available in Easy Mode).
      <br />
      - Reveal All Cards
      <br />
      Shows the pictures of all cards for 3 seconds.
      <br />
      - Matching Card Finder
      <br />
      These buttons reveal the matching card for a card you have already
      selected (To use these buttons, one card must already be revealed).
      <br />
      <button onClick={handleGamePage}>Back to the Game</button>
    </div>
  );
}
