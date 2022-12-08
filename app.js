const mysql=require("mysql");
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'web'

})

con.connect((error)=>{
    if(error){
        console.log("error");
    }
    else{
        console.log("Database connected");
    }
})