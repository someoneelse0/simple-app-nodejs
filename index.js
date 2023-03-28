const r=require("express").Router();
const cookieParser=require("cookie-parser");
r.use(cookieParser());
r.get("/",(req,res)=>{
	res.sendFile(__dirname+"/index.html");
});
module.exports=r;
