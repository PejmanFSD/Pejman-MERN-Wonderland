import Reversi from './Reversi';

export default function ReversiPage({updateTotalPoint, currentUser}) {
    return (
        <Reversi updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}