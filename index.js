var express = require('express')
var ejs = require('ejs')

var app = express()

app.use(express.static('public'))
app.set('view engine','ejs')

app.get('/',function(req,res){

    res.send('Hello')
})

app.listen(8080,function(err){
    if (err)
    {
        console.log('Error! listening on port 8080')
    }
    else
    console.log('App listening on port 8080')
})
