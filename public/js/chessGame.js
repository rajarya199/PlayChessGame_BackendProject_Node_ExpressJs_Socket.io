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
        pieceElement.innerText=getPieceUnicode(square)
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
const handleMove = (source,target) => {
  constmove={
    //chess coln-a,b,c,d,e,f.....
    //chess row 8,7,6,5....
    // 97 -ascii-a
    from:`${String.fromCharCode(97+source.col)}${8-source.row}` ,
    to:`${String.fromCharCode(97+target.col)}${8-target.row}` ,
    promotion:q, //bydefault give life/promotion to queen when pawn finish coln
  }
};

// how pices are showm
const getPieceUnicode = (piece) => {
  const unicodePieces = {
    k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙", // White Pieces (lowercase)
    K: "♚", Q: "♛", R: "♜", B: "♝", N: "♞", P: "♟"  // Black Pieces (uppercase)
  };

  return unicodePieces[piece.type] || "";
};




renderBoard();
