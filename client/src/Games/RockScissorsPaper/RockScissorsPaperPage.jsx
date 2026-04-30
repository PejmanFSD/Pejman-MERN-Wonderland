import RockScissorsPaper from './RockScissorsPaper';

export default function RockScissorsPaperPage({updateTotalPoint, currentUser}) {
    return (
        <RockScissorsPaper updateTotalPoint={updateTotalPoint} currentUser={currentUser} />
    )
}