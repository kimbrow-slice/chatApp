//import express module
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Message = require('./models/Messages.js')
//define our mgongoDB connection string
const mongoDB =
  "mongodb+srv://WebDevAdmin:124512AXEL@mycluster.0lxio.mongodb.net/chatApp?retryWrites=true&w=majority";
  //use  mongoose to connect to Mongo Database, with some option to stop annoying 
  //derecatuion warning, and a callback to handle connection
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) return console.log(error);
    console.log("connected to the DB");
});

//create our express application
const chatApp = express();
// const port = 3000;

const http = require('http').Server(chatApp);
var io = require('socket.io')(http)

//open the server for connection(s)
// chatApp.listen(port, () => console.log("We are listening in on this server"));
//allowing express to use static files in the folder name public
chatApp.use(express.static(path.join(__dirname, 'public')));
chatApp.use(bodyParser.json());
chatApp.use(bodyParser.urlencoded({extended:false}));

const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error"));

io.on('connection', function(){
    console.log("A user has connected!");
})
http.listen(3000, () => {
console.log("running a http server");
})
//get messages
chatApp.get('/messages', (request,response) => {  
    Message.find(function (error, messages){
        if(error) {   
        console.log(messages);
        return console.error(error);} 
        response.send(messages); 
    });
});
//recieve messages
chatApp.post('/messages', (request, response) => {
    let message = new Message(request.body);
    message.save(function(error, message){
        if(error){ 
            response.sendStatus(500);
            return console.error(error)
        };
        io.emit('message', request.body);
        response.sendStatus(200);
    })
});