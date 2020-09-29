console.log("Hello world!!!aa!!");
const express = require('express');
const app = express();
const http = require('http'); 
const fs = require('fs'); 
const server = http;
const path = require('path');
const router = express.Router();
const PORT = 3000; 

// app.get('/', function(req, res){
//    res.send("Hello world!!bbbbbb");
// });
app.use(express.static(__dirname + '/public'));

//Load the first page
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/page.html'));
  });

//app.use('/', router);
console.log('Running at Port 3000');

app.listen(3000);