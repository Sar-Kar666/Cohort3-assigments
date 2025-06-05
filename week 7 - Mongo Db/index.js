const bcrypt=require('bcrypt');
const express =require('express');
const{UserModel, TodoModel}=require("./db");
const jwt=require('jsonwebtoken');
const JWT_SECRET="";
const mongoose =require ("mongoose");
const { z }=require('zod');

mongoose.connect("");
const app=express();
app.use(express.json());

app.post("/signup", async function(req,res){

    const requiredBody= z.object({
        email:z.string().min(3).max(100).email(),
        name:z.string().min(3).max(100),
        password:z.string().min(3).max(50)
    })

    const parsedData=requiredBody.safeParse(req.body);

    if(!parsedData.success){
        res.json({
            message:"Incorrect Format",
            error: parsedData.error
        })
        return
    }

        const email=req.body.email;
        const password=req.body.password;
        const name=req.body.name;

        try{

        const hashedPassword= await bcrypt.hash(password, 5);
        

        await UserModel.create({
            email:email,
            password:hashedPassword,
            name:name
        })

        res.json({
            message:"you are logged in"
        })

        }
        catch(e){
            res.json({
                mesage:"User already exists"
            })

            }
        
});

app.post("/signin", async function(req,res){
        const email=req.body.email;
        const password=req.body.password;

         const user= await UserModel.findOne({
            email:email,
           
        })
        
        if(!user){
            res.status(403).json({
                message: "User doesnt exists in our DB"
            })
            return;
        }

        const MatchPassowrd=await bcrypt.compare(password,user.password);
        

        if(MatchPassowrd){
            const token=jwt.sign({
                id: user._id.toString()
            },JWT_SECRET);
            res.json({
                token: token
            });

        }else{
            res.status(403).json({
                message: "Incorrect credentials"
            })
        }


});

app.post("/todo",auth,function(req,res){
    const userId=req.userId;
    
    res.json({
        userId:userId
    })
});

app.get("/todos",auth,function(req,res){
    const userId=req.userId;
    
    res.json({
        userId:userId
    })
});



function auth(req,res,next){
    const token=req.headers.token;

    const decodedData= jwt.verify(token,JWT_SECRET);

    if(decodedData){
        req.userId=decodedData.id;
        next();
    }else{
        res.status(403).json({
            message: "incorrect Credentials"
        })
    }
}

app.listen(3000);