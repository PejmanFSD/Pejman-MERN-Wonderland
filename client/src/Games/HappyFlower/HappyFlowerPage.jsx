import HappyFlower from './HappyFlower';

export default function HappyFlowerPage({updateTotalPoint, currentUser}) {
    return (
        <HappyFlower updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}