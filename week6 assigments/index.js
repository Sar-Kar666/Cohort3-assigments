const express = require ('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET="ILOVEANNIEE";

const app = express();
app.use(express.json());

const users=[];

function logger(req,res,next){
    console.log(req.method+"request came");
    next();
}


app.get("/",function(req,res){
        res.sendFile(__dirname+"/index.html");
})


app.post("/signup",logger,function (req,res){
    const username=req.body.username;
    const password=req.body.password;

    users.push({
        username:username,
        password:password
    })

    res.json({
        message:"you are signed in"
    })

})


app.post("/signin", logger,(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let user=null;

    for(let i=0;i<users.length;i++)
    {
        if(users[i].username===username && users[i].password===password){
            user=users[i];
        }
    }

    if(!user){
        res.json({
            message:"credentials not matching"
        })
        return;
    }else{
        const token=jwt.sign({
            username
        },JWT_SECRET);

        res.header("jwt",token);
        res.header("random","sarkar");
        res.json({
            token:token
        })
    }
});


function auth(req,res,next){
const token=req.headers.token;
const decodedData= jwt.verify(token,JWT_SECRET);

    if(decodedData.username){
        req.username=decodedData.username;
        next()
    }else{
        res.json({
            message:"you are not logged in"
        })
    }
}

app.get("/me",logger,auth,function(req,res){
    const token = req.headers.token;
    const decodedInfo=jwt.verify(token,JWT_SECRET);
    const username=decodedInfo.username;


    let foundUser=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username==username){
            foundUser=users[i];
        }
    }

    if(foundUser){
        res.json({
            username: foundUser.username,
            password: foundUser.password
        })
    }else{
         res.json({
            message:"sorry"
        })
    }

})


app.listen(3000);