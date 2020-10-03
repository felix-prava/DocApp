const express = require('express');
const http = require('http'); 
const fs = require('fs'); 
const server = http;
const path = require('path');
const { ppid } = require('process');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 3000; 
const bcrpypt = require('bcryptjs');


const app = express();
//app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/nodekb', {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect('mongodb://localhost/persondb',  {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

//Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
})

//Check for DB errors
db.on('error', function(err){
  console.log(err);
})

//Get Models
let ArticleModel = require('./models/article');
let UserModel = require('./models/user');

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
  ArticleModel.find({}, function(err, articles){
    if (err){
      console.log(err);
    }
    else{
      res.render('index1', {
        title:'Article',
        articles: articles
      });
    }
  });
});

//Get Single Article
app.get('/article/:id', function(req, res){
  ArticleModel.findById(req.params.id, function(err, article){
    res.render('article', {
      article: article
    });
    console.log(article.title);
  });
});

//Add Route
app.get('/articles/add', function(req,res){
  res.render('add_article',{
    title:'Add Article'
  });
});

//Add Submit POST Route
app.post('/articles/add', function(req,res){
  let article = new ArticleModel();
  article.title = req.body.title;
  article.author = req.body.author;
  article.save(function(err){
    if(err){
      console.log(err);
      return;
    }else{
      res.redirect('/');
    }
  });
});

//Load Edit Form
app.get('/article/edit/:id', function(req, res){
  ArticleModel.findById(req.params.id, function(err, article){
    res.render('edit_article', {
      title:'Edit Article',
      article: article
    });
  });
});

//Update Submit
app.post('/articles/edit/:id', function(req,res){
  let article = {};

  article.title = req.body.title;
  article.author = req.body.author;

  let query = {_id:req.params.id}

  ArticleModel.updateOne(query, article, function(err){
    if(err){
      console.log(err);
      return;
    }else{
      res.redirect('/');
    }
  });
});




//Register Form
app.get('/users/register', function(req, res){
  res.render('register');
});

//Register Process
app.post('/users/register', function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  let newUser = new UserModel({
    name:name,
    email:email,
    username:username,
    password:password
  });
  bcrpypt.genSalt(10, function(err, salt){
    bcrpypt.hash(newUser.password, salt, function(error, hash){
      if(error){
        console.log(error);
      }
      newUser.password = hash;
      newUser.save(function(err){
        if (err){
          console.log(err);
          return;
        }
        else{
          res.redirect('/users/login');
        }
      })
    });
  });
});

app.get('/users/login', function(req, res){
  res.render('login');
})

console.log('Running at Port 3000');
app.listen(3000);