export default function Log({gameTurns}){
    return <ol id="log">
{gameTurns.map(data=><li key={`${data.square.row}${data.square.col}`}>{data.player} selected {data.square.row},{data.square.col}</li>)}
    </ol>
}