import Bingo from './Bingo';

export default function BingoPage({updateTotalPoint, currentUser}) {
    return (
        <Bingo updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}