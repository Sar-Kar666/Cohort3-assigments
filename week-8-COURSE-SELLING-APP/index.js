const express =require('express');
const { userRouter }= require("./routers/user");
const { courseRouter }= require("./routers/course");
const { adminRouter }= require("./routers/admin");


const app=express();

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);



app.listen(3000);