const express =require('express');

const app= express();
app.use(express.json());

const users=[];


app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html");
})
app.get("/todos",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})



app.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "you are signed in"
    })
    

});

app.post("/signin",function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    let user=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username===username && users[i].password===password){
            user=users[i];
        }
        else{
            
            res.json({
                message:"wrong Credentials"
            })
            return;
        }   
     }
    res.json({
        message:"you are logged in"
    })

});

app.listen(4000);