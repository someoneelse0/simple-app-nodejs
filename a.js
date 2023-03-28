const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
app.use(cookieParser());
app.get("/",(req,res)=>{
	res.cookie("user0","done");
	res.send(req.cookies);
});
app.listen(3000);
