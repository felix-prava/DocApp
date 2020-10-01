const express = require('express');
const app = express();
const http = require('http'); 
const fs = require('fs'); 
const server = http;
const path = require('path');
const { ppid } = require('process');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 3000; 

mongoose.connect('mongodb://localhost/nodekb', {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.createConnection('mongodb://localhost/nodekb', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

//Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
})

//Check for DB errors
db.on('error', function(err){
  console.log(err);
})
//Get Modelsnpm start
let Article = require('./models/article');

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Load the first page
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/pages/firstPage.html'));
  });

  //Load the second page
app.get('/second',function(req,res){
  res.sendFile(path.join(__dirname + '/pages/page2.html'));
});

//Load the third page
app.get('/third',function(req,res){
  Article.find({}, function(err, articles){
    if (err){
      console.log(err);
    }
    else{

      console.log(articles);
      res.render('index', {
        title:'Article',
        articles: articles
      });
    }
  });
  // res.render('index2');
});


//app.use('/', router);
console.log('Running at Port 3000');

app.listen(3000);