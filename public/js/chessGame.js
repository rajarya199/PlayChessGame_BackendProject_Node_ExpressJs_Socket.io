const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null; //which piece
let sourceSquare = null; //from where
let playerRole = null;

const renderBoard = () => {
  const board = chess.board();
  boardElement.innerHTML = ""; //clear the board
  board.forEach((row, rowIndex) => {
    row.forEach((square, squareIndex) => {
      const squareElement = document.createElement("div");
      squareElement.classList.add(
        "square",
        (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark" //color of the square
      );

        squareElement.dataset.row = rowIndex;
        squareElement.dataset.col=squareIndex
        //is square not null it hold pieces
       if (square){
        const pieceElement=document.createElement("div")
        pieceElement.classList.add("piece",
            square.color==="w" ?"white":"black"
        );
        pieceElement.innerHTML=""
        pieceElement.draggable=playerRole===square.color//only the player can move his pieces
        pieceElement.addEventListener("dragstart",(e)=>{
            //drag  which piece, from where
            if(pieceElement.draggable){
                draggedPiece=pieceElement
                squareSource={row:rowIndex,col:squareIndex};
                e.dataTransfer.setData("text/plain","")
            }
        });
        pieceElement.addEventListener("dragend",(e)=>{
            draggedPiece=null
            squareSource=null
        });

        squareElement.appendChild(pieceElement);
       }

       squareElement.addEventListener("dragover",(e)=>{
        e.preventDefault()
       })
       squareElement.addEventListener("drop",function(e){
        e.preventDefault();
        //if the piece is dragged and dropped on a square
        if(draggedPiece){
      
          const targetSource={
            row:parseInt(squareElement.dataset.row),
            col:parseInt(squareElement.dataset.col)
          };
          handleMove(sourceSquare,targetSource)
        };
       })
       boardElement.appendChild(squareElement)

    });
  });
};
renderBoard();
const handleMove = () => {};

// how pices are showm
const getPieceUnicode = () => {};
