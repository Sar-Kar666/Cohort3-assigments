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



function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

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

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({
            username:username
        },JWT_SECRET);
        user.token = token;
        res.send({
            token
        })
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
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