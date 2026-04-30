import Puzzle from './Puzzle';

export default function PuzzlePage({updateTotalPoint, currentUser}) {
    return (
        <Puzzle updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}