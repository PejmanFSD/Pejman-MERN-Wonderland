import Counter from './Counter';

export default function CounterPage({updateTotalPoint, currentUser}) {
    return (
        <Counter updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}