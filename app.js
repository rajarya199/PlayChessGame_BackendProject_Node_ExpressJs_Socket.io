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

app.get("/",function(req,res){
    res.render("index",{title:"Play Chess"}) //render index.ejs file
    })

    server.listen(3000,function(){
    console.log("Server is running on port 3000")
    })