const express=require('express');
const http=require('http');
const socket=require('socket.io');
const path=require('path');
const {Chess}=require('chess.js');

const app=express();

//make server of http for socket.io and link to express server
const server=http.createServer(app);
const io=socket(server);

app.set("view engine","ejs") //set view engine to ejs
app.use(express.static(path.join(__dirname,"public"))) //set static folder to public

//initiate chess,js
const chess=new Chess();
let players={}
let currentPlayer="w"

app.get("/",function(req,res){
    res.render("index",{title:"Play Chess"}) //render index.ejs file
    })



io.on("connection",function(uniquesocket){

    //io-send to all users
//uniquesocket-send to a specific user
    console.log("connected")
    if(!players.white){
        players.white=uniquesocket.id //assign white player to the socket id
        uniquesocket.emit("playerRole","w") //send 
    }
    else if(!players.black){
        players.black=uniquesocket.id //assign black player to the socket id
        uniquesocket.emit("playerRole","b") 
    } else{
        uniquesocket.emit("spectatorRole")
    }

    uniquesocket.on("disconnect",function(){
        if(uniquesocket.id===players.white){
            delete players.white //delete white player from players object
        }else if(uniquesocket.id===players.black){
            delete players.black 
    
        }
    })
uniquesocket.on("move",(move)=>{

    try{
        //if not your turn,return
        if(chess.turn()==='w' && uniquesocket.id !== players.white)return;
        if(chess.turn()==='b' && uniquesocket.id !== players.black)return;

        const result =chess.move(move)
        //if correct move 
        if(result){
            currentPlayer=chess.turn() //set current player to the turn of the chess.js
            io.emit("move",move) 
            io.emit("boardState",chess.fen()) //send the board state to all players
        } else{
console.log("invalid move",move);
            uniquesocket.emit("invalidMove:",move) //send invalid move to the player who made the move
        }
    }
    catch(err){
        console.log(err)
        uniquesocket.emit("invalidMove:",move) ;
    }
})

});






    server.listen(3000,function(){
    console.log("Server is running on port 3000")
    })