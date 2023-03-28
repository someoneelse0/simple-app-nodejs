const r=require("express").Router();
const cookieParser=require("cookie-parser");
const bd=require("./bd.js");
r.use(cookieParser());
r.get("/logout/:id",(req,res)=>{
	res.clearCookie(req.params.id);
        res.sendFile(__dirname+"/logout.html");
});
module.exports=r;
