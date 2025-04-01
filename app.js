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
    console.log("connected")
});


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

socket.on("disconnect",function(){
    if(uniquesocket.id===players.white){
        delete players.white //delete white player from players object
    }else if(uniquesocket.id===players.black){
        delete players.black 

    }
})

    server.listen(3000,function(){
    console.log("Server is running on port 3000")
    })