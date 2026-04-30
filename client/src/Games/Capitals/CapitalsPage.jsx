import Capitals from './Capitals';

export default function CapitalsPage({updateTotalPoint, currentUser}) {
    return (
        <Capitals updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}