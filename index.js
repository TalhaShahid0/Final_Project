var con=require('./connection')
const express=require('express');
var app=express();
var bodyParser=require('body-parser');
const cookie_parser=require("cookie-parser");
const session = require('express-session');
// const MySQLStore=require("express-mysql-session")(session);
const auth_admin = (req, res, next) => {
  if (!req.session.admin) {
    
      return res.redirect("/loginadmin");
  }
  
  next();
};
const auth_student = (req, res, next) => {
  if (!req.session.admin) {
    
      return res.redirect("/login");
  }
  
  next();
};

// module.exports=auth_admin;
// module.exports=auth_student;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');
app.get('/',function(req,res)
{

  res.sendFile(__dirname+'/main.html')
 // res.sendFile(__dirname+'/login.html');   
});
app.get("/login",(req,res)=>{

 res.sendFile(__dirname+'/login.html');   


})
app.post('/login',function(req,res)
{
  var Id=req.body.Id;
  var name=req.body.name;
  var address=req.body.address;
  var phoneno=req.body.phoneno;
  var email=req.body.email;
  var Password=req.body.Password;
  con.connect(function(error)
  {
    if(error)
    throw error;
    var sql="INSERT INTO user(user_id,user_name,user_address,user_phone,user_email,user_password) Values('"+Id+"','"+name+"','"+address+"','"+phoneno+"','"+email+"','"+Password+"')"
    con.query(sql,function(error,result)
    {
      if(error)
      {
      throw error;
      }
      res.send("Student registered successfull"+result.insertId);
      res.redirect("/");
    });
  });
});
app.get('/users',function(req,res)
{
    con.connect(function(error)
{
    if(error)
    {
      console.log(error);
    }
    var sql ="select * from user";
    con.query(sql,function(error,result)
    {
      if(error)
      {
        console.log(error);
      }
      res.render(__dirname+"/users",{user:result});


    });
});  
});

app.get('/delete-user',function(req,res)
{
  con.connect(function(error)
  {
      if(error)
      {
        console.log(error);
      }
      var sql ="delete from user where user_id=?";
      var id=req.query.id;
      con.query(sql,[id],function(error,result)
      {
        if(error)
        {
          console.log(error);
        }
        res.redirect('/users');
   
      });
  });
});

app.get('/update-user',function(req,res)
{
  con.connect(function(error)
  {
      if(error)
      {
        console.log(error);
      }
      var sql ="select * from user where user_id=?";
      var id=req.query.id;
      con.query(sql,[id],function(error,result)
      {
        if(error)
        {
          console.log(error);
        }
        res.render(__dirname+"/update-user",{user:result});
       });
  });
});
app.post("/update-user",function(req,res)
{
  var Id=req.body.Id;
  var name=req.body.name;
  var address=req.body.address;
  var phoneno=req.body.phoneno;
  var email=req.body.email;
  var Password=req.body.Password;

  con.connect(function(error)
  {
      if(error)
      {
        console.log(error);
      }
      var sql ="UPDATE user set user_name=?,user_address=?,user_phone=?,user_email=?,user_password=? where user_id=?";
      var id=req.query.id;
      con.query(sql,[name,address,phoneno,email,Password,Id],function(error,result)
      {
        if(error)
        {
          console.log(error);
        }
        res.redirect("/user");
  
  
       });
  });

});

// Admin Creation
 app.get("/loginadmin",(req,res)=>{

  res.sendFile(__dirname+'/loginadmin.html');   


 })
 app.post('/loginadmin',function(req,res)
 {
   var Id2=req.body.Id2;
   var name2=req.body.name2;
   var address2=req.body.address2;
   var phoneno2=req.body.phoneno2;
   var email2=req.body.email2;
   var Password2=req.body.Password2;
   con.connect(function(error)
   {
     if(error)
     throw error;
     var sql="INSERT INTO admin(admin_id,admin_name,admin_address,admin_phone,admin_email,admin_password) Values('"+Id2+"','"+name2+"','"+address2+"','"+phoneno2+"','"+email2+"','"+Password2+"')"
     console.log(sql);
     con.query(sql,function(error,result)
     {
       if(error)
       {
       throw error;
       }
       res.send("Student registered successfull"+result.insertId);
       res.redirect("/loginadmin");
     });
   });
 });
 app.get('/admins',function(req,res)
{
    con.connect(function(error)
{
    if(error)
    {
      console.log(error);
    }
    var sql ="select * from admin";
    con.query(sql,function(error,result)
    {
      if(error)
      {
        console.log(error);
      }
      res.render(__dirname+"/admins",{admin:result});


    });
});  
});
app.get('/delete-admin',function(req,res)
{
  con.connect(function(error)
  {
      if(error)
      {
        console.log(error);
      }
      var sql ="delete from admin where admin_id=?";
      var id=req.query.id;
      con.query(sql,[id],function(error,result)
      {
        if(error)
        {
          console.log(error);
        }
        res.redirect('/admins');
   
      });
  });
});
app.get('/update-admin',function(req,res)
{
  con.connect(function(error)
  {
      if(error)
      {
        console.log(error);
      }
      var sql ="select * from admin where admin_id=?";
      var id=req.query.id;
      con.query(sql,[id],function(error,result)
      {
        if(error)
        {
          console.log(error);
        }
        res.render(__dirname+"/update-admin",{admin:result});
       });
  });
});
app.post("/update-admin",function(req,res)
{
  var Id2=req.body.Id2;
  var name2=req.body.name2;
  var address2=req.body.address2;
  var phoneno2=req.body.phoneno2;
  var email2=req.body.email2;
  var Password2=req.body.Password2;

  con.connect(function(error)
  {
      if(error)
      {
        console.log(error);
      }
      var sql ="UPDATE admin set admin_name=?,admin_address=?,admin_phone=?,admin_email=?,admin_password=? where admin_id=?";
      var id=req.query.id;
      con.query(sql,[name2,address2,phoneno2,email2,Password2,Id2],function(error,result)
      {
        if(error)
        {
          console.log(error);
        }
        res.redirect("/admins");
  
  
       });
  });

});

app.use(
  session({
    secret:"helloworld",
    resave:false,
    saveUninitialized:true,
    cookie:{
      path:"/",
      httpOnly:true,
      secure:false,
      maxAge:1*60*60*1000
    }
  })
)

/*var sessionStore=new MySQLStore(
  {
   expiration:10800000,
   createDatabaseTable:true,
   schema:{
    tableName:'sessiontbl',
    columName:{
      session_id:'session_id',
      expires:'expires',
      data:'data'
    }
   } 
  },sessionStore)
  app.use(session({
    secret:'Project Web',
    resave:false,
    store:sessionStore,
    saveUninitialized:ture
  
  }))
app.get('/cookies',function(req,res)
{
  req.session.isAuth=true;
  console.log(req.session.id)
  res.sendFile(__dirname+'/cookies.html')
 // res.sendFile(__dirname+'/login.html');   
});*/

app.listen(7000);