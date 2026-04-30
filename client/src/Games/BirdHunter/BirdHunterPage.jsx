import BirdHunter from './BirdHunter';

export default function BirdHunterPage({updateTotalPoint, currentUser}) {
    return (
        <BirdHunter updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}