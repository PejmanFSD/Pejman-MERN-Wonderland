import BlackJack from './BlackJack';

export default function BlackJackPage({updateTotalPoint, currentUser}) {
    return (
        <BlackJack updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}