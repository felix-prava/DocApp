const express = require('express');
const app = express();
const http = require('http'); 
const fs = require('fs'); 
const server = http;
const path = require('path');
const router = express.Router();
const PORT = 3000; 

app.use(express.static(__dirname + '/public'));

//Load the first page
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/pages/firstPage.html'));
  });

  //Load the second page
app.get('/second',function(req,res){
  res.sendFile(path.join(__dirname + '/pages/page2.html'));
});


//app.use('/', router);
console.log('Running at Port 3000');

app.listen(3000);