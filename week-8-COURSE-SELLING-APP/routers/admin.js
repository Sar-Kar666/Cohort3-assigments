const { Router }= require('express');
const adminRouter = Router();
const { adminModel, courseModel }=require("../db");
// const {z}=require("zod");
const jwt=require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}=require("../config");
const {adminMiddleware}=require("../middelware/admin");
const course = require('./course');



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


adminRouter.put("/course",adminMiddleware, async function(req,res){

    const adminId=req.userId;

    const {title,description,imageUrl,price, courseId}=req.body;

    await courseModel.updateOne({
        _id:courseId,
        creatorId: adminId
    },{
        title,description,price,imageUrl,
    });

    res.json({
        message: "Course Updated ",
        courseId: course._id
    });
});


adminRouter.get("/course/bulk", adminMiddleware,async function(req,res){
   
    const adminId=req.userId;

   const courses=  await courseModel.find({
        creatorId: adminId
    });

    res.json({
        message: "Course Updated ",
        courses
    });
})


module.exports={
    adminRouter: adminRouter
}