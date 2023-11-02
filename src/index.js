import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square (props) {
  const [value, setValue] = useState(props.input);
  return <button className='square' onClick={props.onSquareClick}>{props.input}</button>
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill("_"));
  
  function handleClick(i) {
    const remainingSquares = squares.slice();
    remainingSquares[i] = "X";
    setSquares(remainingSquares);
  }  

  return (
    <>
      <div className="board-row">
        <Square input={squares[0]} onSquareClick={() => handleClick(0)}></Square>
        <Square input={squares[1]} onSquareClick={() => handleClick(1)}></Square>
        <Square input={squares[2]} onSquareClick={() => handleClick(2)}></Square>
      </div>
      <div className="board-row">
        <Square input={squares[3]} onSquareClick={() => handleClick(3)}></Square>
        <Square input={squares[4]} onSquareClick={() => handleClick(4)}></Square>
        <Square input={squares[5]} onSquareClick={() => handleClick(5)}></Square>
      </div>
      <div className="board-row">
        <Square input={squares[6]} onSquareClick={() => handleClick(6)}></Square>
        <Square input={squares[7]} onSquareClick={() => handleClick(7)}></Square>
        <Square input={squares[8]} onSquareClick={() => handleClick(8)}></Square>
      </div>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board />);
