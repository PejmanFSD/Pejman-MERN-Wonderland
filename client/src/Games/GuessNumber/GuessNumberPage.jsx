import GuessNumber from './GuessNumber';

export default function GuessNumberPage({updateTotalPoint, currentUser}) {
    return (
        <GuessNumber updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}