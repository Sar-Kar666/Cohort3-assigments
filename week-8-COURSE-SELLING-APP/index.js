const express =require('express');
const mongoose=require("mongoose");


const { userRouter }= require("./routers/user");
const { courseRouter }= require("./routers/course");
const { adminRouter }= require("./routers/admin");
const app=express();

app.use(express.json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);


async function main(){
    await mongoose.connect("mongodb+srv://admin:wyArcxLoww3YzzMO@cluster0.amlcxqh.mongodb.net/Course-Selling-App");
    app.listen(3000);
    console.log("listening to port 3000");
}

main();
