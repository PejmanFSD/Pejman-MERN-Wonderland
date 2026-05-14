import Snake from './Snake';

export default function SnakePage({updateTotalPoint, currentUser}) {
    return (
        <Snake updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}