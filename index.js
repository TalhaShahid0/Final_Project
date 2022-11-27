var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var mysql = require('mysql');

var app = express()

app.use(express.static('public'))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',function(req,res){

    res.render('pages/index')
})

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'final_project'
  });
   
  connection.connect(function(err) {
    if (err) {
      console.error('Error! in database connection: ' + err.stack);
      return;
    }
  
    console.log('Database connection established as id ' + connection.threadId);
  });

app.listen(8080,function(err){
    if (err)
    {
        console.log('Error! listening on port 8080')
    }
    else
    console.log('App listening on port 8080')
})
