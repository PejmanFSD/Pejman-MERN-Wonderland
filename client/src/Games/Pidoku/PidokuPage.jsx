import Pidoku from './Pidoku';

export default function PidokuPage({updateTotalPoint, currentUser}) {
    return (
        <Pidoku updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}