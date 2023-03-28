const r=require("express").Router();
const cookieParser=require("cookie-parser");
const bd=require("./bd.js");
r.use(cookieParser());
r.get("/",(req,res)=>{
	res.sendFile(__dirname+"/config.html");
});
module.exports=r;
