import {useState} from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X:"Player 1",
  O:"Player 2"
}

const listData = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner (gameboardSquare,players){
  let winner;
  
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameboardSquare[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameboardSquare[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameboardSquare[combination[2].row][combination[2].column];
  
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  
  }
  return winner;
}

function deriveGameBoard (gameTurns){
  let gameboardSquare = [...listData.map(array=>[...array])];
  for (const turn of gameTurns){
    const {square,player} = turn;
    const {row,col} = square;
    gameboardSquare[row][col] = player;
  }
  return gameboardSquare;
}



function deriveActivePlayer (gameTurns){
  let currentPlayer = "X";
  if(gameTurns.length>0 && gameTurns[0].player === "X"){
    currentPlayer = "O"
  }
  return currentPlayer;
}
function App() {
  const [players,setPlayers] = useState(PLAYERS);
  const [gameTurns,setGameTurns] = useState([]);
  let playerActiveSymbol = deriveActivePlayer(gameTurns);
  // const [playerActiveSymbol,setPlayerActiveSymbol] = useState("X"); To reduce state management and removing unnecessary states

  const gameboardSquare = deriveGameBoard(gameTurns);
const winner = deriveWinner(gameboardSquare,players);

  let hasDraw = (gameTurns.length === 9 && !winner);

  function handleSquareSelect(rowIndex,colIndex){
  // setPlayerActiveSymbol(prev => prev==="X"?"O":"X");
  setGameTurns(prevGameTurn=>{
    let activeCurrentPlayer = deriveActivePlayer(prevGameTurn);
const updatedgameTurns = [{square:{row:rowIndex,col:colIndex},player:activeCurrentPlayer},...prevGameTurn];
return updatedgameTurns;
  })
}
function handleRestart(){
setGameTurns([]);
}
function handlePlayerNameChange(symbol,newPlayer){
  setPlayers(prev=>{
    return{
      ...prev,
      [symbol]:newPlayer
    }
  })
}
  return (
    <menu>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={playerActiveSymbol==="X"} onNameChange={handlePlayerNameChange} />
          <Player name={PLAYERS.O} symbol="O" isActive={playerActiveSymbol==="O"} onNameChange={handlePlayerNameChange}/>
          
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart = {handleRestart}/>}
        <GameBoard onSelectSquare={handleSquareSelect} board={gameboardSquare}/>
      </div>
  <Log gameTurns={gameTurns}/>
    </menu>
  );
}

export default App;
