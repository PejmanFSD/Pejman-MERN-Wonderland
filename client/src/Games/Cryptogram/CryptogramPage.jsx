import Cryptogram from './Cryptogram';

export default function CryptogramPage({updateTotalPoint, currentUser}) {
    return (
        <Cryptogram updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}