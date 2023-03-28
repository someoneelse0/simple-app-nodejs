const r=require("express").Router();
const cookieParser=require("cookie-parser");
const bd=require("./bd.js");
r.use(cookieParser());
r.get("/map",(req,res)=>{
        res.sendFile(__dirname+"/map.html");
});
module.exports=r;
