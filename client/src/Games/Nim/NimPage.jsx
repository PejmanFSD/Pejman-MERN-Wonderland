import Nim from './Nim';

export default function NimPage({updateTotalPoint, currentUser}) {
    return (
        <Nim updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}