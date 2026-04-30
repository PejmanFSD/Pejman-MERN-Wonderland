import TugOfWar from './TugOfWar';

export default function TugOfWarPage({updateTotalPoint, currentUser}) {
    return (
        <TugOfWar updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}