import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Reset from './Reset';
function Square (props) {
  const [value, setValue] = useState(props.input);
  return <button className='square' onClick={props.onSquareClick}>{props.input}</button>
}

function Board() {
  const [symbol, setSymbol] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill("_"));
  const [winner, setWinner] = useState(null);
  const[status, setStatus] = useState('Next player' + 'X');
  const [toReset, setReset] = useState(false);
  const [resetBtn, setResetBtn] = useState(null);
  useEffect(() => {game_Win()},[squares]);
  useEffect(() => {setStatus(winner ? 'Winner is ' + symbol :  'Next player ' + symbol)}, [symbol,winner]);
  useEffect(() => {renderResetBtn()},[toReset]);

  function game_Win() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      
      if (squares[a] !== "_" && squares[b] !== "_" && squares[c] !== "_") {
        if (squares[a] === squares[b] && squares[a] === squares[c]) {
          if(symbol !== "O") {
            setSymbol("O");
          } else {
            setSymbol("X");
          }
          setWinner(symbol);
          setReset(true);
          return true;
        }
      }
    }
    return false;
  }
  
  function handleClick(i) {
    if (squares[i] !== "_" || winner) {
      return;
    }
    const remainingSquares = squares.slice();
    remainingSquares[i] = symbol;
    
    setSquares(remainingSquares);
    
    if(symbol !== "O") {
      setSymbol("O");
    } else {
      setSymbol("X");
    }
  
  } 
  function reset() {
    setSymbol("X");
    setSquares(Array(9).fill("_"));
    setWinner(null);
    setStatus('Next player' + 'X');
    setReset(false);
    setResetBtn(null);
  }
  function renderResetBtn() {
    if(toReset) {
     setResetBtn(<Reset func={() => reset()}/>);
    }
  }
  return (
    <>
      <div className="status">
        {status}
      </div>
      <div>
        {resetBtn}
      </div>
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
