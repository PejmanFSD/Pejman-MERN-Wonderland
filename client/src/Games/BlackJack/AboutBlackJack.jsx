export default function AboutBlackJack({ setIsAboutPage }) {
  const handleGamePage = () => {
    setIsAboutPage(false);
  };
  return (
    <div>
      <h2>About Guess Number</h2>
      <h4>How to Play</h4>
      This game is based on the classic card game BlackJack.
      <br />
      Before the game begins, the deck of cards is shuffled.
      <br />
      Both you and Pejman start with 7 gambling chips.
      <br />
      <h4>Betting System</h4>
      At the beginning of each round:
      <br />
      You place your bet by moving some of your chips to the center,
      <br />
      Pejman automatically matches your bet with the same number of chips.
      <br />
      The winner of the round takes all chips placed in the center.
      <br />
      The game continues until one player owns all the gambling chips.
      <h4>Player Actions</h4>
      After receiving your cards, you can choose from the following actions:
      <br />
      - Hit: Receive an additional card.
      <br />
      - Raise: Increase the current bet by adding more chips.
      <br />
      - Stand: End your turn and keep your current hand.
      <br />
      ⚠️ Important Rule:
      <br />
      You cannot stand immediately after raising
      <br />
      (after raising, you must take at least one more card before standing).
      <h4>Card Values</h4>
      - Number cards are worth their face value.
      <br />
      - King, Queen, and Jack are worth 10.
      <br />
      - Ace can be worth 1 or 11.
      <br />
      (When receiving an Ace, the player chooses which value to use).
      <br />
      <br />
      The total value of a hand is the sum of all card values.
      <br />
      You always play first in each round, and Pejman plays afterward.
      <br />
      <br />
      <strong>Round Outcomes:</strong>
      <br />
      Each round can end in one of the following ways:
      <br />
      1- You Get BlackJack: If your hand reaches exactly 21, you immediately win
      the round and Pejman does not play.
      <br />
      2- Pejman Gets BlackJack: If Pejman reaches exactly 21, he wins the round.
      <br />
      3- You Get Busted: If your hand exceeds 21, you lose the round
      immediately.
      <br />
      4- Pejman Gets Busted: If Pejman’s hand exceeds 21, you win the round.
      <br />
      5- Both Hands Are Below 21: If neither player reaches or exceeds 21, the
      player with the higher hand value wins.
      <br />
      If both hands are equal:
      <br />
      In Easy Mode, you win the round and in Normal Mode, Pejman wins the round.
      <br />
      * Special Rule: Double-Aces-BlackJack
      <br />
      There is one special exception in the game; if a player has exactly 2 Aces
      and chooses the value 11 for both, the hand value becomes 21 instead of 22
      <br />
      (This special situation is called Double-Aces-BlackJack).
      <h4>Betting Restrictions</h4>
      Since you control the betting, your bet cannot exceed the smaller number
      of chips owned by either player.
      <br />
      If one player runs out of chips, raising is no longer allowed and a
      message will appear explaining this restriction.
      <br />
      <h4>Card Recycling</h4>
      At the end of each round, used cards are set aside. When the deck becomes
      empty, all previously used cards are shuffled again and reused.
      <br />
      <h4>Game Modes</h4>
      <strong>Easy Mode:</strong>
      <br />
      - Pejman does not remember previously used cards.
      <br />
      - If both hands have equal value, you win the round.
      <br />
      - Win the game to earn 1 star.
      <br />
      <strong>Normal Mode:</strong>
      <br />
      - Pejman remembers all previously used cards (but he still does not know
      upcoming cards).
      <br />
      - If both hands have equal value, Pejman wins the round.
      <br />
      - Win the game to earn 3 stars.
      <br />
      <button onClick={handleGamePage}>Back to the Game</button>
    </div>
  );
}
