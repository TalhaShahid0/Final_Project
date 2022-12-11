const express =require('express');
const app=express();
const path =require('path');
const routes=require('./routes/athleteworld');
const cookieParser = require("cookie-parser");
const session = require('express-session');

 app.set('view engine','ejs');
 app.use(
    session({
        secret: "Web Project",
        resave: false,
        saveUninitialized: true,
        cookie: { path: "/", httpOnly: true, secure: false, maxAge: 1 * 60 * 60 * 1000 },//session will expire after 1 hour
    })
);
app.use(cookieParser())
  
 const publicPath = path.join(__dirname, "/public");
 app.use(express.static(publicPath));

 app.use("/", routes);

 app.listen(5000, (err)=>{
    if(err) throw err;
    console.log(`Server Listening At Port 5000`);
})