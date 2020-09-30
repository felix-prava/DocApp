const express = require('express');
const app = express();
const http = require('http'); 
const fs = require('fs'); 
const server = http;
const path = require('path');
const { ppid } = require('process');
const router = express.Router();
const PORT = 3000; 

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Load the first page
app.get('/',function(req,res){
  let articles = [
    {
      id: 1,
      title: "Harry Potter"
    },
    {
      id: 2,
      title: "Winnetou"
    }
  ]
    res.sendFile(path.join(__dirname+'/pages/firstPage.html'));
  });

  //Load the second page
app.get('/second',function(req,res){
  res.sendFile(path.join(__dirname + '/pages/page2.html'));
});

//Load the third page
app.get('/third',function(req,res){
  res.render('index');
});


//app.use('/', router);
console.log('Running at Port 3000');

app.listen(3000);