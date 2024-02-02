

export default function GameBoard({onSelectSquare,board}) {

 
  
  // const [gameboardSquare, setgameboardSquare] = useState(listData);
  // function handleClick(rowIndex, colIndex) {
  //   setgameboardSquare((prevGameboardSquare) => {
  //     const updatedGameboardSquare = [
  //       ...prevGameboardSquare.map((rowData) => [...rowData]),
  //     ];
  //     updatedGameboardSquare[rowIndex][colIndex] = playerActive;
  //     return updatedGameboardSquare;
  //   });
  //   onSelectSquare();
  // }
  return (
    <>
      <ol id="game-board">
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol !== null}>
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
