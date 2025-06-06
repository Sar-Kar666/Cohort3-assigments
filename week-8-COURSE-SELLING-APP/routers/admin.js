const { Router }= require('express');
const adminRouter = Router();
const { adminModel, courseModel }=require("../db");
// const {z}=require("zod");
const jwt=require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}=require("../config");
const {adminMiddleware}=require("../middelware/admin");



adminRouter.post("/signup", async function(req,res){
      const { email, password, firstName, lastName } =req.body;

    await adminModel.create({
        email,
        password,
        firstName,
        lastName
    })
    res.json({
        message: "signup endpoint"
    })
    
})


adminRouter.post("/signin",async function(req,res){


    const { email, password } =req.body;

    const admin=await adminModel.findOne({
        email,
        password
    });

    if(admin){
        const token=jwt.sign
        ({
          id:admin._id},JWT_ADMIN_PASSWORD);

          res.json({
            token: token
          })
        }else{

        res.status(403).json({
            message:"incorrect Credentials"
        })

        }
})


adminRouter.post("/course",adminMiddleware, async function(req,res){
    const adminId=req.userId;

    const {title,description,imageUrl,price}=req.body;

    await courseModel.create({
        title,description,price,imageUrl,adminId
    });

    res.json({
        message: "Course created ",
        courseId: course._id
    });
})


adminRouter.put("/course",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.get("/course/bulk",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})


module.exports={
    adminRouter: adminRouter
}