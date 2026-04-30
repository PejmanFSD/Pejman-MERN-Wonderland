import MemoryCards from './MemoryCards';

export default function MemoryCardsPage({updateTotalPoint, currentUser}) {
    return (
        <MemoryCards updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}