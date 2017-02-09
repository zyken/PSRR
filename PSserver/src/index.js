import express from "express";
import http from "http";
import socketIO from "socket.io";
import path from "path";
import bodyParser from "body-parser";

import users from "./routes/users";
import auth from "./routes/auth";
import events from "./routes/events";
import requests from "./routes/requests";

let app = express();
let httpServer = http.Server(app);
let io = socketIO(httpServer)

app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/events", events);
app.use("/api/requests", requests);

// io.on("connection", (socket) => {
//     console.log("A user connected");
//     socket.on("disconnect", () =>{
//         console.log("user disconnected");
//     });

//     socket.on("chat message", (msg) => {
//         console.log("message: " + msg);
//         socket.broadcast.emit("chat message", msg);
//     });

//     socket.broadcast.emit("user connected");

// });

httpServer.listen(8080 , () => console.log("running on localhost:8080"));








// var express = require('express');
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// import bodyParser from "body-parser";
// import users from "./routes/users";
// import auth from "./routes/auth";
// import events from "./routes/events";

// app.use(bodyParser.json());

// app.use("/api/users", users);
// app.use("/api/auth", auth);
// app.use("/api/events", events);

// app.get('/', function(req, res){
//   res.sendfile('index.html');
// });

// io.on('connection', function(socket){
//   console.log('a user connected');
// });

// http.listen(8080, function(){
//   console.log('listening on *:8080');
// });
