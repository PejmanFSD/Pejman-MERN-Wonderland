import Maze from './Maze';

export default function MazePage({updateTotalPoint, currentUser}) {
    return (
        <Maze updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}