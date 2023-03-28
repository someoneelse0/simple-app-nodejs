const r=require("express").Router();
const cookieParser=require("cookie-parser");
const bd=require("./bd.js");
r.use(cookieParser());
r.get("/delaccper/:id",(req,res)=>{
	bd.query("DELETE FROM users WHERE username=?;",[req.params.id],(e,f,r)=>{
		if(e)throw e;
	});
	res.clearCookie(req.params.id);
        res.sendFile(__dirname+"/delaccper.html");
});
module.exports=r;
